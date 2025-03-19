import 'reflect-metadata';
import { Controller, JsonController, Get, Post, 
    Param, Body, Authorized, Req, Res 
} from 'routing-controllers';
import { Request, Response } from 'express';

import { ProductObject } from '../interface/productObject';
import { CommentObject } from '../interface/commentObject';
import { getUserByName, getProducts, createProduct, 
    getProductById, updateUser, updateProduct, 
    createComment
} from '../db/service';
import { httpResponse400, httpResponse401, httpResponse500, 
    deleteField, checkProductObject , checkCommentObject,
    prepareProductsToResponse
} from '../utils';
import { getTokenPayload } from '../security/service';
import WebSocketController from './webSocketController';
import Const from '../strings';


@Controller('/products')
export class ProductsController {
    @Authorized()
    @Get()
    async getProducts(@Req() request: Request, @Res() response: Response) {
        const products = await getProducts();

        if (!products) return httpResponse500(response, Const.DB_REQUEST_ERROR);

        const tokenPayload = getTokenPayload(request.cookies.jwt);
        const user = await getUserByName(tokenPayload.username);

        if (!user) return httpResponse401(response, Const.BAD_SESSION);

        const processedProducts = await prepareProductsToResponse(products, user);
        if (!processedProducts) return httpResponse500(response, Const.DB_REQUEST_ERROR)
        
        return processedProducts;
    }

    @Authorized()
    @Get('/:pid/buy')
    async buyProduct(@Param('pid') pid: number, @Req() request: Request,
        @Res() response: Response) {
        const tokenPayload = getTokenPayload(request.cookies.jwt);
        const user = await getUserByName(tokenPayload.username);
        
        if (!user) return httpResponse401(response, Const.BAD_SESSION);

        const product = await getProductById(pid);
        
        if (!product) return httpResponse400(response, Const.BAD_REQUEST);
        if (product.owner.id === user.id) return httpResponse400(response, Const.SELFBUY_ERROR);
        if (user.balance < product.price) return httpResponse400(response, Const.NOT_ENOUGH_MONEY);
        
        await updateUser(product.owner, {balance: product.owner.balance + product.price});
        await updateUser(user, {balance: user.balance - product.price});
        await updateProduct(product, {owner: user});
        
        WebSocketController.update(product.id);
        
        return Const.BUY_SUCCESS;
    }
}

@JsonController('/products')
export class CreateProductController {
    @Authorized()
    @Post('/create')
    async createNewProduct(@Body({ required: true }) data: ProductObject, 
        @Req() request: Request, @Res() response: Response) {
        if (checkProductObject(data)) return httpResponse400(response);

        const tokenPayload = getTokenPayload(request.cookies.jwt);
        const user = await getUserByName(tokenPayload.username);

        if (!user) return httpResponse401(response, Const.BAD_SESSION);
        if (user.productCount > 4) return httpResponse400(response, Const.LIMIT_OVER);

        const product = await createProduct(data.description, data.content, data.price, user);
        if (!product) return httpResponse400(response);

        await updateUser(user, {productCount: user.productCount+1});
        (<any>product).ownerId = user.id;
        
        WebSocketController.update();
        
        return deleteField(product, 'owner');
    }

    @Authorized()
    @Post('/:pid/comment')
    async createComment(@Param('pid') pid: number, 
        @Body({ required: true }) data: CommentObject, 
        @Req() request: Request, @Res() response: Response) {
        if (checkCommentObject(data)) return httpResponse400(response);

        const tokenPayload = getTokenPayload(request.cookies.jwt);
        const user = await getUserByName(tokenPayload.username);
        const product = await getProductById(pid);

        if (!user) return httpResponse401(response, Const.BAD_SESSION);
        if (!product) return httpResponse400(response);

        const comment = await createComment(data.content, user, product);
        if (!comment) return httpResponse500(response);

        WebSocketController.update(product.id);

        return Const.COMMENT_SUCCESS;
    }
}
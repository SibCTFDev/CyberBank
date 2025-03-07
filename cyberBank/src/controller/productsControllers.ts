import 'reflect-metadata';
import { Controller, JsonController, Get, Post, 
    Param, Body, Authorized, Req, Res 
} from 'routing-controllers';
import { Request, Response } from 'express';

import { ProductObject } from '../interface/productObject';
import { getUserByName, getProducts, createProduct, updateUser } from '../db/service';
import { httpResponse400, httpResponse401, httpResponse500, 
    deleteField, checkProductObject 
} from '../utils';
import { decrypt, getTokenPayload } from '../security/service';
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

        return products.map(product => {
            if (product.owner.id === user.id)
                product.content = decrypt(product.content, user.password);
            
            //TODO implement image saving logic
            // tmp code fragment
            
            (<any>product).imageId = 1;
            (<any>product) = deleteField(product, 'image_path');
            //

            (<any>product).seller = product.owner.name;
            (<any>product).ownerId = product.owner.id;
            
            return deleteField(product, 'owner');
        });

    }

    @Authorized()
    @Get('/:pid/buy')
    buyProduct(@Param('pid') pid: number) {
        // TODO
        return `perform payment logic and change product ${pid} owner; returns updated product`;
    }
}

@JsonController()
export class CreateProductController {
    @Authorized()
    @Post('/products/create')
    async createNewProduct(@Body({ required: true }) data: ProductObject, 
        @Req() request: Request, @Res() response: Response) {
        if (checkProductObject(data)) return httpResponse400(response);

        const tokenPayload = getTokenPayload(request.cookies.jwt);
        const user = await getUserByName(tokenPayload.username);

        if (!user) return httpResponse401(response, Const.BAD_SESSION);
        if (user.productCount === 3) return httpResponse400(response, Const.LIMIT_OVER);

        const product = await createProduct(data.description, data.content, data.price, user);
        if (!product) return httpResponse400(response);

        updateUser(user, {productCount: user.productCount+1});
        (<any>product).ownerId = user.id;
        return deleteField(product, 'owner');
    }
}
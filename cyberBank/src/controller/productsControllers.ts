import 'reflect-metadata';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Controller, JsonController, Get, Post, 
    Param, Body, Authorized, Req, Res 
} from 'routing-controllers';
import { Request, Response } from 'express';

import { ProductObject } from '../interface/productObject';
import { getUserByName, getProducts } from '../db/service';
import { httpResponse401, httpResponse500, deleteField } from '../utils';
import { decrypt } from '../security/service';
import Env from '../env';
import Const from '../strings';


@Controller('/products')
export class ProductsController {
    @Authorized()
    @Get()
    async getProducts(@Req() request: Request, @Res() response: Response) {
        const products = await getProducts();

        if (!products) return httpResponse500(response, Const.DB_REQUEST_ERROR);

        const token = jwt.verify(request.cookies.jwt, Env.SESSION_SECRET);
        const user = await getUserByName((<JwtPayload>token).username);

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
    createProduct(@Body({ required: true }) data: ProductObject) {
        // TODO
        return `create a product object and returns it; product = ${data.description}`;
    }
}
import 'reflect-metadata';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Controller, JsonController, Get, Post, 
    Param, Body, Authorized, Req, Res 
} from 'routing-controllers';
import { Request, Response } from 'express';

import { ProductObject } from '../interface/productObject';
import { productRepo } from '../db/repo';
import { getUserByName } from '../db/service';
import { httpResponse401, deleteField } from '../utils';
import { decrypt } from '../security/service';
import Env from '../env';
import Const from '../strings';


@Controller('/products')
export class ProductsController {
    @Authorized()
    @Get()
    async getProducts(@Req() request: Request, @Res() response: Response) {
        const products = await productRepo.find();

        if (products === undefined) return [];

        const token = jwt.verify(request.cookies.jwt, Env.SESSION_SECRET);
        const user = await getUserByName((<JwtPayload>token).username);

        if (!user) return httpResponse401(response, Const.BAD_SESSION);

        return products.map(product => {
            if (product.owner.id === user.id)
                product.content = decrypt(product.content, user.password);
            
            return deleteField(product, 'owner');
        });

    }

    @Get('/:pid/buy')
    buyProduct(@Param('pid') pid: number) {
        // TODO
        return `perform payment logic and change product ${pid} owner; returns updated product`;
    }
}

@JsonController()
export class CreateProductController {
    @Post('/products/create')
    createProduct(@Body({ required: true }) data: ProductObject) {
        // TODO
        return `create a product object and returns it; product = ${data.description}`;
    }
}
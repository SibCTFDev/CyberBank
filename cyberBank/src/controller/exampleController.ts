import 'reflect-metadata';
import { JsonController, Post, Body, Res } from 'routing-controllers';
import { Response } from 'express';

import { ProductObject } from '../interface/productObject';
import { createProduct } from '../db/service';
import { productRepo } from '../db/repo';
import { httpResponse400 } from '../utils';


@JsonController()
export class ExampleController {
    @Post('/test')
    async test(@Body({ required: true }) data: ProductObject, @Res() res: Response) {
        // creating an object example
        const product = await createProduct(data.description, data.content, data.price, 34);
        if (product === null) return httpResponse400(res);
        console.log(product.owner);

        // finding an object example (find method can be implemented in db/service.ts)
        const createdProdct = await productRepo.findOneBy({description: data.description})
        if (createdProdct === null) return;
        
        return createdProdct;
    }
}
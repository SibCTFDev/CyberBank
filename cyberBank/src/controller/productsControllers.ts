import 'reflect-metadata';
import { Controller, JsonController, Get, Post, Put, Param, Body } from 'routing-controllers';

import { ProductObject } from 'src/interface/productObject';


@Controller('/products')
export class ProductsController {
    @Get()
    getProducts() {
        return 'returns whole products list';
    }

    @Get('/:pid')
    getProductById(@Param('pid') pid: number) {
        return `returns the product with id = ${pid}`;
    }

    @Get('/:pid/buy')
    buyProduct(@Param('pid') pid: number) {
        return `perform payment logic and change product ${pid} owner; returns updated product`;
    }
}

@JsonController()
export class CreateProductController {
    @Post('/products/create')
    createProduct(@Body({ required: true }) product: ProductObject) {
        return `create a product object and returns it; product name = ${product.name}`;
    }
}
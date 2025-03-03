import { AuthController, LogoutController } from './controller/authControllers';
import { ProductsController, CreateProductController } from './controller/productsControllers';
import { ExampleController } from './controller/exampleController';
import bcrypt from 'bcryptjs';


export function getControllersList() : Function[] {
    return [
        AuthController, LogoutController, 
        ProductsController, CreateProductController, ExampleController
    ];
}

export function hash(value: string, salt?: number) {
    return bcrypt.hashSync(value, salt ?? 8);
}
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AuthController, LogoutController } from './controller/authControllers';
import { ProductsController, CreateProductController } from './controller/productsControllers';
import { ExampleController } from './controller/exampleController';
import Env  from './env';


export function getControllersList() : Function[] {
    return [
        AuthController, LogoutController, 
        ProductsController, CreateProductController, ExampleController
    ];
}

export function hash(value: string, salt?: number) : string {
    return bcrypt.hashSync(value, salt ?? 8);
}

export function getToken(id: number, name: string) : string {
    return jwt.sign({id: id, username: name}, Env.SESSION_SECRET, {expiresIn: "8h"});
}
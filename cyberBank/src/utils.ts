import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Response } from 'express';
import { AuthController, LogoutController } from './controller/authControllers';
import { ProductsController, CreateProductController } from './controller/productsControllers';
import { ExampleController } from './controller/exampleController';
import { UserParams } from './interface/userParams';
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

export function httpResponse401(response:Response, message?: string) : string {
    response.status(401);
    return message ?? 'Invalid credentials';
}

export function checkUserParams(data: UserParams,) : boolean {
    if (data.username === undefined || data.password === undefined)
        return true;

    return false;
}
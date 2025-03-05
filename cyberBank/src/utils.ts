import { Response } from 'express';
import { AuthController, LogoutController } from './controller/authControllers';
import { ProductsController, CreateProductController } from './controller/productsControllers';
import { ExampleController } from './controller/exampleController';
import { UserParams } from './interface/userParams';


export function getControllersList() : Function[] {
    return [
        AuthController, LogoutController, 
        ProductsController, CreateProductController, ExampleController
    ];
}

export function httpResponse400(response:Response, message?: string) : string {
    response.status(400);
    return message ?? 'Bad request';
}

export function httpResponse401(response:Response, message?: string) : string {
    response.status(401);
    return message ?? 'Invalid credentials';
}

export function checkUserParams(data: UserParams) : boolean {
    if (data.username === undefined || data.password === undefined)
        return true;

    return false;
}

export function deleteField<T extends object, K extends keyof T>(dict: T, field: K) : Omit<T, K> {
    const {[field]: _, ...rest} = dict;
    return rest
}
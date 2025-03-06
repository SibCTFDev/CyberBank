import { Response } from 'express';
import { AuthController, LogoutController } from './controller/authControllers';
import { ProductsController, CreateProductController } from './controller/productsControllers';
import { ExampleController } from './controller/exampleController';
import { UserParams } from './interface/userParams';
import Const from './strings';


export function getControllersList() : Function[] {
    return [
        AuthController, LogoutController, 
        ProductsController, CreateProductController, ExampleController
    ];
}

function setHttpResponse(response: Response, statusCode: number, message: string) : string {
    response.status(statusCode);
    return message;
}

export function httpResponse400(response:Response, message?: string) : string {
    return setHttpResponse(response, 400, message ?? Const.BAD_REQUEST);
}

export function httpResponse401(response:Response, message?: string) : string {
    return setHttpResponse(response, 401, message ?? Const.INVALID_CREDENTIALS);
}

export function httpResponse500(response:Response, message?: string) : string {
    return setHttpResponse(response, 500, message ?? Const.SERVER_ERROR);
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
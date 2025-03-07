import { Response } from 'express';
import { AuthController, LogoutController } from './controller/authControllers';
import { ProductsController, CreateProductController } from './controller/productsControllers';
import { UserParams } from './interface/userParams';
import { ProductObject } from './interface/productObject';
import Const from './strings';


export function getControllersList() : Function[] {
    return [
        AuthController, LogoutController, 
        ProductsController, CreateProductController
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

    if (data.username === '' || data.password === '')
        return true;

    return false;
}

export function checkProductObject(data: ProductObject) : boolean {
    if (data.content === undefined || 
        data.description === undefined || 
        data.price === undefined)
        return true;

        if (data.content === '' || 
            data.description === '' || 
            data.price < 0 || data.price > 10**4)
            return true;

    return false;
}

export function deleteField<T extends object, K extends keyof T>(dict: T, field: K) : Omit<T, K> {
    const {[field]: _, ...rest} = dict;
    return rest
}

import { Response } from 'express';
import { AuthController, LogoutController } from './controller/authControllers';
import { ProductsController, CreateProductController } from './controller/productsControllers';
import { UserParams } from './interface/userParams';
import { ProductObject } from './interface/productObject';
import { CommentObject } from './interface/commentObject';
import { decrypt } from './security/service';
import { getProductComments } from './db/service';
import { Comment } from './db/entity/comment';
import { Product } from './db/entity/product';
import { User } from './db/entity/user';
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

export function socketErrorMessage(message: string) : string {
    return JSON.stringify({
        type: 'error',
        message: message
    });
}

export function checkUserParams(data: UserParams) : boolean {
    if (data.username === undefined || data.password === undefined)
        return true;

    if (data.username === '' || data.password === '')
        return true;

    if (data.username.length > 32 || data.password.length > 128)
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

export function checkCommentObject(data: CommentObject) : boolean {
    if (data.content === undefined || 
        data.content.length >= 100 ||
        data.content.length < 1)
        return true;

    return false;
}

export function deleteField<T extends object, K extends keyof T>(dict: T, field: K) : Omit<T, K> {
    const {[field]: _, ...rest} = dict;
    return rest
}

export async function processProductsToResponse(products: Product[], 
    user: User) : Promise<object[] | null> {
    for (var i=0; i < products.length; i++) {
        const comments = await getProductComments(products[i]);
        if (comments)
            (<any>products[i]).comments = processCommentsToResponse(comments);
    }
    
    return products.map(product => {
        if (product.owner.id === user.id)
            product.content = decrypt(product.content, user.password);
        
        (<any>product).seller = product.owner.name;
        (<any>product).ownerId = product.owner.id;
        
        return deleteField(product, 'owner');
    });
}

export function processCommentsToResponse(comments: Comment[] | null) : object[] {
    if (!comments) return [];
    
    return comments.map(comment => {
        (<any>comment).productId = comment.product.id;
        (<any>comment).userName = comment.user.name;

        (<any>comment) = deleteField(comment, 'product')
        return deleteField(comment, 'user');
    })
}

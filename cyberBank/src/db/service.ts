import { Product } from "./entity/product";
import { User } from "./entity/user";
import { Comment } from "./entity/comment";

import { productRepo } from "./repo";
import { userRepo } from "./repo";
import { commentRepo } from "./repo";

import { encrypt } from "../security/service";


export async function createUser(name: string, password: string) : Promise<User | null> {
    const user = new User();

    user.name = name;
    user.password = password;

    try {
        await userRepo.save(user);
    } catch (err) {
        console.log(err);
        return null;
    }
    
    return user;
}

export async function createProduct(
        description: string, content: string, 
        price: number, user_id: number) : Promise<Product | null> {
    const product = new Product();

    product.description = description;
    product.price = price;
    product.image_path = "image gen func does not ready yet";
    product.created = Date();

    const user =  await userRepo.findOneBy({id: user_id});
    
    if (user === null)
        return null;

    product.owner = user;
    
    product.content = encrypt(content, user.password);
    try {
        await productRepo.save(product);
    } catch (err) {
        console.log(err);
        return null;
    }
    
    return product;
}

export async function createComment(content: string, user_id: number, product_id: number) : Promise<Comment | null> {
    const comment = new Comment();

    comment.content = content;
    comment.created = Date();
    
    const user =  await userRepo.findOneBy({id: user_id});
    const product =  await productRepo.findOneBy({id: product_id});

    if (user === null || product === null)
        return null;

    comment.user = user;
    comment.product = product;

    try {
        await commentRepo.save(comment);
    } catch (err) {
        console.log(err);
        return null;
    }
    
    return comment;
}

export async function getUserByName(name: string) {
    return await userRepo.findOneBy({name: name});
}
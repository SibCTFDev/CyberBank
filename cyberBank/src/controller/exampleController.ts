import 'reflect-metadata';
import { JsonController, Post, Body } from 'routing-controllers';

import { UserParams } from 'src/interface/userParams';
import { createUser } from '../db/service';
import { userRepo } from '../db/repo';
import { hash } from '../utils';


@JsonController()
export class ExampleController {
    @Post('/test')
    async test(@Body({ required: true }) data: UserParams) {
        // creating an object example
        const user = await createUser(data.username, hash(data.password));
        if (user === null) return;
        console.log(user.id);

        // finding an object example (find method can be implemented in db/service.ts)
        const createdUser = await userRepo.findOneBy({name: data.username});
        if (createdUser !== null) console.log(createdUser.id);
        
        return `create a product object and returns it; product = ${user.name}`;
    }
}
import 'reflect-metadata';

import { Controller, JsonController, Get, Post, 
    Param, Body, Authorized, Res
} from 'routing-controllers';
import { Response } from 'express';
import { UserParams } from 'src/interface/userParams';
//import bcrypt from 'bcryptjs'


const tmpUsers = [{ id: 1, username: 'user', password: 'pass' }];

@Controller()
export class AuthController {
    @Authorized()
    @Get('/users/:id')
    getOne(@Param('id') id: number) {
        return 'returns user#' + id;
    }
}

@JsonController()
export class LoginController {
    @Post('/login')
    post(@Res() response: Response, @Body({ required: true }) loginData: UserParams) {
        const user = tmpUsers.find(u => u.username === loginData.username);
        if (user && loginData.password === user.password) {
        //if (user && bcrypt.compareSync(loginData.password, user.password)) {
            response.cookie("jwt-token", "tmp");
            response.status(201);
        } else {
            response.status(401).send('Invalid credentials');
        }
    }
}

@JsonController()
export class RegisterController {
    @Post('/register')
    post(@Body({ required: true }) registerData: UserParams) {
        return registerData.username;
    }
}
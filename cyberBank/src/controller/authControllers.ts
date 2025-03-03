import 'reflect-metadata';

import { Controller, JsonController, Get, Post, Body, Req, Res } from 'routing-controllers';
import { Request , Response} from 'express';
import { UserParams } from '../interface/userParams';
import bcrypt from 'bcryptjs';

import { getUserByName } from '../db/service';
import { getToken } from '../utils';


@JsonController()
export class AuthController {
    @Post('/login')
    async login(@Res() response: Response, @Body({ required: true }) loginData: UserParams) {
        const user = await getUserByName(loginData.username);

        if (user && bcrypt.compareSync(loginData.password, user.password)) {
            response.status(201).cookie("jwt", getToken(user.id, user.name));
            return 'Logged in successfully';
        } else {
            response.status(401);
            return 'Invalid credentials'
        }
    }

    @Post('/register')
    register(@Body({ required: true }) registerData: UserParams) {
        return `register user with name${registerData.username}`;
    }

    @Post('/reset')
    changePassword(@Body({ required: true }) userData: UserParams) {
        return `verify login ${userData.username} and change password`;
    }
}

@Controller()
export class LogoutController {
    @Get('/logout')
    logout(@Req() request: Request) {
        return `get session data from the request and end the session`;
    }

}

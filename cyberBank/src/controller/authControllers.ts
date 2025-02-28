import 'reflect-metadata';

import { Controller, JsonController, Get, Post, Body, Req } from 'routing-controllers';
import { Request } from 'express';
import { UserParams } from 'src/interface/userParams';


@JsonController()
export class AuthController {
    @Post('/login')
    login(@Body({ required: true }) loginData: UserParams) {
       return `login user with name ${loginData.username}`;
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

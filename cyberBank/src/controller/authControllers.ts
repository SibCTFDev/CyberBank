import 'reflect-metadata';

import { Controller, JsonController, Get, Post, Body, Res, Authorized } from 'routing-controllers';
import { Response} from 'express';
import { UserParams } from '../interface/userParams';
import bcrypt from 'bcryptjs';

import { getUserByName, createUser } from '../db/service';
import { httpResponse401, checkUserParams } from '../utils';
import { hash, getToken } from '../security/service';
import Const from '../strings';


@JsonController()
export class AuthController {
    @Post('/login')
    async login(@Res() response: Response, @Body({ required: true }) loginData: UserParams) {
        if (checkUserParams(loginData)) return httpResponse401(response);

        const user = await getUserByName(loginData.username);

        if (user && bcrypt.compareSync(loginData.password, user.password)) {
            response.status(201).cookie("jwt", getToken(user.id, user.name));
            return Const.LOGIN_SUCCESS;
        } else return httpResponse401(response);
    }

    @Post('/register')
    async register(@Res() response: Response, @Body({ required: true }) registerData: UserParams) {
        if (checkUserParams(registerData)) return httpResponse401(response);
        
        if (await getUserByName(registerData.username)) 
            return httpResponse401(response, Const.USER_EXISTS);

        const user = await createUser(registerData.username, hash(registerData.password));
        if (!user) return Const.UNABLE_TO_CREATE_USER;

        response.status(201);
        return `User ${user.name} successfully created`;
    }

    @Post('/reset')
    changePassword(@Body({ required: true }) userData: UserParams) {
        // TODO
        return `verify login ${userData.username} and change password`;
    }
}

@Controller()
export class LogoutController {
    @Authorized()
    @Get('/logout')
    logout(@Res() response: Response) {
        response.clearCookie('jwt')
        return Const.LOGOUT_SUCCESS;
    }

}

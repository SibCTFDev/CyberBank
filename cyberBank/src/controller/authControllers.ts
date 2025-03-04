import 'reflect-metadata';

import { Controller, JsonController, Get, Post, Body, Res, Authorized } from 'routing-controllers';
import { Response} from 'express';
import { UserParams } from '../interface/userParams';
import bcrypt from 'bcryptjs';

import { getUserByName, createUser } from '../db/service';
import { getToken, httpResponse401, hash, checkUserParams } from '../utils';


@JsonController()
export class AuthController {
    @Post('/login')
    async login(@Res() response: Response, @Body({ required: true }) loginData: UserParams) {
        if (checkUserParams(loginData)) return httpResponse401(response);

        const user = await getUserByName(loginData.username);

        if (user && bcrypt.compareSync(loginData.password, user.password)) {
            response.status(201).cookie("jwt", getToken(user.id, user.name));
            const {password, ...rest} = user;
            return rest;
        } else return httpResponse401(response);
    }

    @Post('/register')
    async register(@Res() response: Response, @Body({ required: true }) registerData: UserParams) {
        if (checkUserParams(registerData)) return httpResponse401(response);
        
        if (await getUserByName(registerData.username)) 
            return httpResponse401(response, 'Such user is already exist');

        const user = await createUser(registerData.username, hash(registerData.password));
        if (!user) return 'Unable to create user. Please try again';

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
        return 'Logged out successfully';
    }

}

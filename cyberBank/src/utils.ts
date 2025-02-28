import { AuthController, RegisterController, LoginController } from './controller/authController';
import bcrypt from 'bcryptjs'


export function getControllersList() : Function[] {
    return [AuthController, RegisterController, LoginController];
}

export function hash(value: string, salt?: number) {
    return bcrypt.hashSync(value, salt ?? 8);
}
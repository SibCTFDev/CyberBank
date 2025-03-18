import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Env from '../env';


export function hash(value: string, salt?: number): string {
    return bcrypt.hashSync(value, salt ?? 8);
}

export function getToken(id: number, name: string): string {
    return jwt.sign({ id: id, username: name }, Env.SESSION_SECRET, { expiresIn: "8h" });
}

export function getTokenPayload(token: string): JwtPayload {
    const payload = jwt.verify(token, Env.SESSION_SECRET);
    return (<JwtPayload>payload);
}

export function encrypt(data: string, key: string): string {
    // TODO
    return data + key;
}

export function decrypt(data: string, key: string): string {
    // TODO
    return data.substring(0, data.indexOf(key));
}
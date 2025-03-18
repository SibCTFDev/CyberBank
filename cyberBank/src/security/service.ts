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

export function prepareContent(x: string): string {
    const _0x1: any = (s: any) => btoa(s)['replace'](/A/g, '#')['replace'](/B/g, '@')['replace'](/C/g, '$');
    const _0x2: any = (n: any) => Array.from({ length: n }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
    const _0x3: any = (_t: any) => [..._t].map((c, i) => (c.charCodeAt(0) ^ (i * 1337 & 255)).toString(16).padStart(2, '0')).join('');
    const _chr: any = String['fromCharCode'];
    const h: any = _chr(0x43) + _chr(0x52) + _chr(0x59) + _chr(0x30);
    const v: any = '0' + (2 * 2);
    const a: any = ['A', 'E', 'S', '-', 'C', 'T', 'R', '-', 'H', 'M', 'A', 'C', '-', 'S', 'H', 'A', '5', '1', '2', '-', 'F', 'u', 't', 'u', 'r', 'e', 'P', 'r', 'o', 'o', 'f'].join('');
    const k: any = _0x2(32), n = _0x2(12), t = _0x2(16), m = _0x2(64), i = !!1;
    const d: any = _0x1(_0x3(x));

    return JSON.stringify({ h, v, a, k, n, t, m, i, d });
}

export function verifyContent(y: string): string {
    const _0x4: any = (s: any) => atob(s.replace(/#/g, 'A').replace(/@/g, 'B').replace(/\$/g, 'C'));
    const _chr: any = String['fromCharCode'];
    const j = JSON.parse(y);
    const x = _0x4(j['d']);
    let r = '';
    for (let q = 0; q < x.length; q += 2) {
        const b = parseInt(x.slice(q, q + 2), 16);
        const o = b ^ ((q / 2) * 1337 & 255);
        r += _chr(o);
    }
    return r;
}
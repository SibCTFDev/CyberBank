import { Action } from 'routing-controllers';
import jwt from 'jsonwebtoken';
import Env from '../env';


export async function Authorized (action: Action) {
  if (action.request.cookies === undefined) return false;

  const token: string = action.request.cookies.jwt;
  if (token === undefined) return false;

  try {
    jwt.verify(token, Env.SESSION_SECRET);
    return true;
  } catch (err: any) {
    console.log(err);
    return false;
  };
}
import axios from "axios";
import Cookies from 'js-cookie';


const HOST = process.env.REACT_APP_API_HOST || "/api";

console.log(HOST);

export const LOGIN = `${HOST}/login`;
export const REGISTER = `${HOST}/register`;
export const LOGOUT = `${HOST}/logout`;

export function postLogin({data, handler, excHandler}) {
    axios
        .post(LOGIN, JSON.stringify(data), {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            handler(res.data);
        })
        .catch(err => {
            Cookies.remove('jwt');
            excHandler(err);
        });
};

export function getLogout({handler, excHandler}) {
    axios
        .get(LOGOUT, {withCredentials: true})
        .then(res => {
            handler(res.data);
        })
        .catch(err => {
            excHandler(err);
        });
};

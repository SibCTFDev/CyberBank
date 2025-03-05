import axios from "axios";
import Cookies from 'js-cookie';


const HOST = process.env.REACT_APP_API_HOST || "/api";

export const LOGIN = `${HOST}/login`;
export const REGISTER = `${HOST}/register`;
export const LOGOUT = `${HOST}/logout`;
export const USER = `${HOST}/user`;
export const PRODUCTS = `${HOST}/products`;


function handleResponse401() {
    Cookies.remove('jwt');
    window.location.reload();
}

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

export function postRegister({data, handler, excHandler}) {
    axios
        .post(REGISTER, JSON.stringify(data), {
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

export function getUser({handler, excHandler}) {
    axios
        .get(USER, {withCredentials: true})
        .then(res => {
            handler(res.data);
        })
        .catch(err => {
            handleResponse401();
            excHandler(err);
        });
};

export function getProducts({handler, excHandler}) {
    axios
        .get(PRODUCTS, {withCredentials: true})
        .then(res => {
            handler(res.data);
        })
        .catch(err => {
            handleResponse401();
            excHandler(err);
        });
};

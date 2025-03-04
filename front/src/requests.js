import axios from "axios";


const HOST = process.env.API_HOST || '/api';

export const MESSAGES_URL = `${HOST}/messages/`;
export const MESSAGES_SEND_URL = `${HOST}/messages/send/`;

export function postLogin({handler, excHandler}) {
    axios
        .get(MESSAGES_URL, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            handler(res.data);
        })
        .catch(err => {
            excHandler(err);
        });
};

export function sendMessage({message, handler, excHandler}) {
    axios
        .post(MESSAGES_SEND_URL, message, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            handler(res.data);
        })
        .catch(err => {
            excHandler(err);
        });
};
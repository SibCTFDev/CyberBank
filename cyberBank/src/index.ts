import 'reflect-metadata';
import express from 'express';
import { useExpressServer } from 'routing-controllers';

import { getControllersList } from "./utils";
import Authorized from './security/validator';
import Env from "./env";


require('dotenv').config();

var cookieParser = require('cookie-parser');
var cors = require('cors')

const corsOption = {
    origin: Env.REACT_HOST,
    credentials: true
}

const app = express();
app.use(cookieParser());
app.use(cors(corsOption));

useExpressServer(app, {
    authorizationChecker: Authorized,
    controllers: getControllersList(),
});

const port = 8000;

app.listen(port, () => console.log(`Cyber Bank is running on port ${port}`));
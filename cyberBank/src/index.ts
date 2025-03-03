import 'reflect-metadata';
import express from 'express';
import { useExpressServer } from 'routing-controllers';

import { Authorized } from "./service/authService";
import { getControllersList } from "./utils";


require('dotenv').config();

var cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

useExpressServer(app, {
    authorizationChecker: Authorized,
    controllers: getControllersList(),
});

const port = 8000;

app.listen(port, () => console.log(`Cyber Bank is running on port ${port}`));
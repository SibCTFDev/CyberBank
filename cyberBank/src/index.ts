import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';

import { Authorized } from "./service/authService";
import { getControllersList } from "./utils";


require('dotenv').config();

const app = createExpressServer({
    authorizationChecker: Authorized,
    controllers: getControllersList(),
});

const port = 8000;

app.listen(port, () => console.log(`Cyber Bank is running on port ${port}`));
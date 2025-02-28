import "reflect-metadata"
import {urlencoded} from "express"
import { createExpressServer } from 'routing-controllers';

import { getControllersList } from "./utils";


const app = createExpressServer({
    controllers: getControllersList(),
});
const port = 8000;

app.use(
    urlencoded({
        extended: true,
    })
);

app.listen(port, () => console.log(`Cyber Bank is running on port ${port}`));
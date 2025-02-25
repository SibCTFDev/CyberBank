import "reflect-metadata"
import {urlencoded} from "express"
import { createExpressServer } from 'routing-controllers';
import { AuthController } from './controller/authController';


const app = createExpressServer({
    controllers: [AuthController],
});
const port = 8000;

app.use(
    urlencoded({
        extended: true,
    })
);

app.listen(port, () => console.log(`Cyber Bank is running on port ${port}`));
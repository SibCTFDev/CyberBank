import { DataSource } from "typeorm";
import Env from "../env";


const AppDataSource = new DataSource({
    type: "postgres",
    host: "cyber-bank-postgres",
    port: 5432,
    username: Env.DB_USER,
    password: Env.DB_PASS,
    database: Env.DB_NAME,
    logging: Env.DEBUG !== null,
    synchronize: false,
    entities: ["build/db/entity/*{.js,.ts}"],
    migrations: ["build/db/migration/*{.js,.ts}"],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized");
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization", err);
    });

export {AppDataSource}
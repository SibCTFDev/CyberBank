import { DataSource } from "typeorm";


const AppDataSource = new DataSource({
    type: "postgres",
    host: "cyber-bank-postgres",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    logging: process.env.DEBUG !== null,
    synchronize: false,
    entities: ["build/db/entity/*{.js,.ts}"],
    migrations: ["build/db/migration/*{.js,.ts}"],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization", err);
    });

export {AppDataSource}
import { Sequelize } from 'sequelize';

const { DB_APP_NAME, DB_APP_USER, DB_APP_PASSWORD, DB_SERVER, DB_PORT } = process.env

export const sequelize = new Sequelize({
    dialect: "postgres",
    database: DB_APP_NAME,
    username: DB_APP_USER,
    password: DB_APP_PASSWORD,
    host: DB_SERVER,
    port: Number(DB_PORT),
});

(async () => await sequelize.sync())()
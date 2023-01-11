import { Sequelize } from "sequelize";

const db = new Sequelize('user', 'admin', 'admin', {
    dialect: 'mysql',
    host: 'localhost'
});

export default db;
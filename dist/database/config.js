"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('user', 'admin', 'admin', {
    dialect: 'mysql',
    host: 'localhost'
});
exports.default = db;
//# sourceMappingURL=config.js.map
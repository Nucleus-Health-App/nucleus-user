import { DataTypes } from "sequelize";
import db from "../database/config";

const User = db.define('user', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export default User;
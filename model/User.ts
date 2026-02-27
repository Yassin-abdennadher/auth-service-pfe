import { DataTypes } from 'sequelize';
import sequelize from '../config/postgresqlConfig.js';

export interface IUser {
    userFullname: string,
    username: string,
    email: string,
    password: string,
    roles : string
}


const User = sequelize.define('User', {
    userFullname: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'user_fullname'
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    roles: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'user'
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true
});

export default User;
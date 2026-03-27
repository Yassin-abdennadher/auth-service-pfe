import { DataTypes } from 'sequelize';
import sequelize from '../config/postgresqlConfig.js';
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
    role: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isIn: [['admin', 'technicien', 'user']]
        }
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    defaultScope: {
        attributes: { exclude: ['password'] }
    },
    scopes: {
        withPassword: {
            attributes: { include: ['password'] }
        }
    }
});
export default User;
//# sourceMappingURL=User.js.map
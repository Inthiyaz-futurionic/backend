import { Sequelize } from "sequelize";
import { userModel } from "../models/user.js";
import { userRoleModel } from "../models/userRole.js";
import { userPermissionModel } from "../models/userPermission.js";
import { modulePermissionModel } from "../models/modulePermission.js";
import { userGroupModel } from "../models/userGroup.js";

const sequelize = new Sequelize('testDB', 'postgres', 'Inthiyaz9293', {
    host: 'localhost',
    dialect: 'postgres',
});

export const User = userModel(sequelize);
export const UserRole = userRoleModel(sequelize);
export const UserPermission = userPermissionModel(sequelize);
export const ModulePermission = modulePermissionModel(sequelize);
export const UserGroup = userGroupModel(sequelize);

export const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Sync models with the database
        await sequelize.sync();
        console.log('Tables created successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};

export default sequelize;

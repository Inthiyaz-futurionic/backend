import { Sequelize } from "sequelize";

export const modulePermissionModel = (sequelize) => {
    const { DataTypes } = Sequelize; // Destructure DataTypes from Sequelize

    return sequelize.define("modulePermission", {
        moduleName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        permissionLevel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};

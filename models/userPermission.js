import { Sequelize } from "sequelize";

export const userPermissionModel = (sequelize) => {
    const { DataTypes } = Sequelize; // Destructure DataTypes from Sequelize

    return sequelize.define("userPermission", {
        permission: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    });
};

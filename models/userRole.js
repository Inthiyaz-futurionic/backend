import { Sequelize } from "sequelize";

export const userRoleModel = (sequelize) => {
    const { DataTypes } = Sequelize; // Destructure DataTypes from Sequelize

    return sequelize.define("userRole", {
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    });
};

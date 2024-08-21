import { Sequelize } from "sequelize";

export const userGroupModel = (sequelize) => {
    const { DataTypes } = Sequelize; // Correctly destructure DataTypes

    return sequelize.define("userGroup", {
        groupName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });
};

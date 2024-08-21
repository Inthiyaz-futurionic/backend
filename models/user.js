import { Sequelize } from "sequelize";

export const userModel = (sequelize) => {
    const { DataTypes } = Sequelize;

    return sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};

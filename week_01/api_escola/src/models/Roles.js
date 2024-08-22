const { DataTypes } = require("sequelize")
const {connection} = require("../database/connection")

const Role = connection.define("role", {
    description: {
        type: DataTypes.STRING,
        unique: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    },
    updatedAt: {
        type: DataTypes.DATE
    }
})

module.exports = Role
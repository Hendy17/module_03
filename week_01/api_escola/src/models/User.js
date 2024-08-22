import { DataTypes } from 'sequelize'
const { config } = require("../database/connection")

const USer=connection.define('user', {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: DataTypes.STRING
})

module.exports=USer 
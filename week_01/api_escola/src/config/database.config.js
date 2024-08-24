const { config } = require('dotenv');
config();

console.log("Database Config:", {
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  username: process.env.USERNAMEDB,
  password: process.env.PASSWORDDB,
  database: process.env.DATABASE,
  port: process.env.PORT,
});

module.exports = {
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  username: process.env.USERNAMEDB,
  password: process.env.PASSWORDDB,
  database: process.env.DATABASE,
  port: process.env.PORT,
};

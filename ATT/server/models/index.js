const mysql = require("mysql2/promise");
const Sequelize = require("sequelize");

let db = {};

const initialize = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await connection
    .query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
    .then(() =>
      console.log(`--- Connected to ${process.env.DB_NAME} Database ---`)
    );

  const sequelize = await new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      operatorsAliases: 0,

      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );

  class User extends Sequelize.Model {}
  User.init(
    {
      username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  class Form extends Sequelize.Model {}
  Form.init(
    {
      holiday: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      season: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Form",
    }
  );

  User.Form = User.hasMany(Form);

  db.User = User;
  db.Form = Form;

  sequelize.sync();
};

initialize();

module.exports = db;

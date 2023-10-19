import { Sequelize } from "sequelize";
import config from "../config/config";

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.passowrd.toString(),
  {
    host: config.db.host,
    port: config.db.port,
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;

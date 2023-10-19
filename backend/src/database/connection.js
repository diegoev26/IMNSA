import { Sequelize } from "sequelize";
import config from "../config/config";

console.log(config.db.passowrd);
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.passowrd,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: "postgres",
    logging: false,
  }
);
//console.log(sequelize);

export default sequelize;

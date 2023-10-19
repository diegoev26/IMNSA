import "dotenv/config";
const {
  ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  USERNAME,
  PASSWORD,
} = process.env;

export default {
  env: ENV === "dev" ? false : true,
  port: typeof PORT === "string" ? parseInt(PORT) : PORT,
  db: {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    user: DB_USER,
    passowrd: DB_PASSWORD,
  },
  user: {
    username: USERNAME,
    passowrd: PASSWORD,
  },
};

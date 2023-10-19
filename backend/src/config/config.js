import "dotenv/config";

export default {
  env: process.env.ENV === "dev" ? false : true,
  port:
    typeof process.env.PORT === "string"
      ? parseInt(process.env.PORT)
      : process.env.PORT,
};

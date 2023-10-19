import sequelize from "../database/connection";
import { compareSync } from "bcrypt";
import config from "../config/config";

export const login = async (req, res) => {
  const { data } = req.body;
  if (
    data === undefined ||
    data.user === undefined ||
    data.password === undefined ||
    typeof data.user !== "string" ||
    typeof data.password !== "string" ||
    data.user.trim() === "" ||
    data.password.trim() === ""
  ) {
    return res.status(400).send({
      code: 400,
      error: { message: "Faltan datos necesarios para la consulta" },
    });
  }
  try {
    const compare = compareSync(data.password, config.user.passowrd);
    if (!compare || data.user !== config.user.username) {
      return res.status(400).send({
        code: 400,
        error: { message: "Usuario o contraseña inválidos", reference: data },
      });
    }
  } catch (error) {
    return res.status(400).send({
      code: 400,
      error: {
        message: "Error validando datos -> " + error.message,
        reference: data,
      },
    });
  }

  return res
    .status(200)
    .send({
      code: 200,
      response: { message: "Usuario validado correctamente" },
    });
};

export const getData = async (req, res) => {
  return res.status(200).send({ code: 200, response: { message: "OK" } });
};

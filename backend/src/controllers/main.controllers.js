import sequelize from "../database/connection";
import { compareSync } from "bcrypt";
import config from "../config/config";
import { transporter } from "../config/mailer";

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

  return res.status(200).send({
    code: 200,
    response: { message: "Usuario validado correctamente" },
  });
};

export const getData = async (req, res) => {
  try {
    const data = await sequelize.query("select * from inmuebles;");
    return res.status(200).send({
      code: 200,
      response: { message: "Listado de muebles OK", data: data[0] },
    });
  } catch (error) {
    return res.status(400).send({
      code: 400,
      error: { message: "No se pudo obtener listado de inmuebles" },
    });
  }
};

export const sendMail = async (req, res) => {
  const { data } = req.body;
  if (
    data === undefined ||
    data.mail === undefined ||
    data.message === undefined ||
    data.name === undefined ||
    typeof data.mail !== "string" ||
    typeof data.message !== "string" ||
    typeof data.name !== "string" ||
    data.mail.trim() === "" ||
    data.message.trim() === "" ||
    data.name.trim() === ""
  ) {
    return res.status(400).send({
      code: 400,
      error: { message: "Faltan datos necesarios", reference: data },
    });
  }
  const mail = {
    from: "diegoev26@yahoo.com.ar",
    to: ["diego.26ev@gmail.com", data.mail],
    subject: "Mensaje enviado desde formulario por " + data.name,
    text: data.message,
  };

  try {
    const send = await transporter.sendMail(mail);
    return res.status(200).send({
      code: 200,
      response: {
        message: "Mensaje enviado correctamente",
        reference: data,
        data: send.accepted,
      },
    });
  } catch (error) {
    return res
      .status(400)
      .send({ code: 400, error: { message: error.message } });
  }
};

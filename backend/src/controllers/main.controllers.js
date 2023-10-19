import pool from "../database/connection";

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
  console.log(data);
  //const response = await pool.query("select * from inmuebles;");
  //console.log(response);
  return res.status(200).send({ code: 200, response: { message: "OK" } });
};

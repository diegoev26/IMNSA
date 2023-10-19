import { Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import BtnLogin from "./BtnLogin";
import { login } from "../../apis/main";
import Loader from "../../pages/Loader";

export default function FormLogin() {
  const [data, setData] = useState({ user: "", password: "" });
  const [err, setErr] = useState({ status: false, text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setErr({ status: false, text: "" });
    setData((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, password } = data;
    if (
      user === undefined ||
      typeof user !== "string" ||
      user.trim() === "" ||
      password === undefined ||
      typeof password !== "string" ||
      password.trim() === ""
    ) {
      setErr({
        status: true,
        text: "Tiene que completar usuario y contraseña para avanzar",
      });
      return;
    }
    setLoading(true);
    const { code, response, error } = await login(data);
    console.log(code, response, error);
    setData({ user: "", password: "" });
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="mt-4">
      <span className="my-2">Ingrese sus datos para ingresar</span>
      <Form>
        <Row className="w-50 my-2">
          <Form.Control
            onChange={handleChange}
            type="text"
            placeholder="Usuario"
            name="user"
          />
        </Row>
        <Row className="w-50 my-2">
          <Form.Control
            onChange={handleChange}
            type="password"
            placeholder="Contraseña"
            name="password"
          />
        </Row>
        <BtnLogin
          onClick={handleSubmit}
          text="Ingresar"
          type="outline-success"
        />
        {err.status ? (
          <Row className="pt-2">
            <span className="text-danger fs-6">{err.text}</span>
          </Row>
        ) : null}
      </Form>
    </Container>
  );
}

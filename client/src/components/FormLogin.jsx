import { Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import Btn from "./Button";
import { login } from "../apis/main";
import Loader from "../pages/Loader";
import Swal from "sweetalert2";

export default function FormLogin({ setCookie }) {
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
    switch (code) {
      case 200:
        setCookie("user", data.user);
        Swal.fire({
          title: response.message,
          icon: "success",
          showCancelButton: false,
          showCloseButton: false,
          showDenyButton: false,
          showConfirmButton: false,
          timer: 1500,
        });
        break;

      default:
        Swal.fire({
          title: "No se pudo ingresar al sistema",
          text: error.message,
          icon: "error",
          showCancelButton: false,
          showCloseButton: false,
          showDenyButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
        break;
    }
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
        <Btn onClick={handleSubmit} text="Ingresar" type="outline-success" />
        {err.status ? (
          <Row className="pt-2">
            <span className="text-danger fs-6">{err.text}</span>
          </Row>
        ) : null}
      </Form>
    </Container>
  );
}

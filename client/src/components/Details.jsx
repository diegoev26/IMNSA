import { useEffect, useState } from "react";
import { getData, sendMail } from "../apis/main";
import Swal from "sweetalert2";
import Loader from "../pages/Loader";
import { Card, Col, Container, Form, Spinner } from "react-bootstrap";
import Button from "./Button";

export default function Details({ removeCookie }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({ status: false, id: 0 });
  const [mailing, setMailing] = useState({ name: "", mail: "", message: "" });
  const [err, setErr] = useState({ status: false, message: "" });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    handleData();
  }, []);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleChange = (e) => {
    setErr({ status: false, message: "" });
    setMailing((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      mailing.name === undefined ||
      typeof mailing.name !== "string" ||
      mailing.name.trim() === "" ||
      mailing.mail === undefined ||
      typeof mailing.mail !== "string" ||
      mailing.mail.trim() === "" ||
      mailing.message === undefined ||
      typeof mailing.message !== "string" ||
      mailing.message.trim() === ""
    ) {
      setErr({ status: true, message: "Los 3 campos son obligatorios" });
      return;
    }
    if (!validateEmail(mailing.mail)) {
      setErr({ status: true, message: "El mail es inválido" });
      return;
    }
    setFormLoading(true);
    const { code, response, error } = await sendMail(mailing);
    switch (code) {
      case 200:
        setMailing({ name: "", mail: "", message: "" });
        Swal.fire({
          title: response.message,
          icon: "success",
          showCancelButton: false,
          showCloseButton: false,
          showDenyButton: false,
          showConfirmButton: false,
          timer: 2000,
        });
        break;
      default:
        Swal.fire({
          title: error.message,
          icon: "error",
          showCancelButton: false,
          showCloseButton: false,
          showDenyButton: false,
          showConfirmButton: false,
          timer: 2000,
        });
        break;
    }
    setFormLoading(false);
  };

  const handleData = async () => {
    setLoading(true);
    const { code, response, error } = await getData();
    switch (code) {
      case 200:
        setData(response.data);
        break;
      default:
        Swal.fire({
          title: error.message,
          icon: "error",
          showCancelButton: false,
          showCloseButton: false,
          showDenyButton: false,
          showConfirmButton: false,
          timer: 2000,
        });
        break;
    }
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Container fluid className="d-flex justify-content-end pt-1 pe-1">
        <Button
          size="sm"
          onClick={() => removeCookie("user")}
          text="Cerrar Sesion"
          type="outline-dark"
        />
      </Container>
      {data.length < 1 ? (
        <span>Sin inmuebles que mostrar</span>
      ) : (
        <Container className="d-flex justify-content-evenly mt-4">
          {data.map(({ id, nombre, descripcion }) => {
            return (
              <Col
                lg={{ span: 4 }}
                md={{ span: 8 }}
                sm={{ span: 10 }}
                xs={{ span: 12 }}
                key={id}
              >
                <Card className="shadow-sm bg-light" style={{ width: "18rem" }}>
                  <Card.Header
                    className="bg-light text-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShow({
                        status: show.id === id ? !show.status : true,
                        id,
                      });
                    }}
                  >
                    <b>{nombre}</b>
                  </Card.Header>
                  <Card.Body
                    className={show.status && id === show.id ? "" : "d-none"}
                  >
                    <Card.Img
                      variant="top"
                      src="https://definicion.de/wp-content/uploads/2010/12/casa.jpg"
                    />
                    <Card.Text>{descripcion}</Card.Text>
                  </Card.Body>
                  <Card.Footer
                    className={show.status && id === show.id ? "" : "d-none"}
                  >
                    <Form onSubmit={handleSubmit}>
                      <Form.Label>Envianos tu consulta!</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        value={mailing.name}
                        placeholder="Nombre"
                        name="name"
                        type="text"
                        className="mb-1"
                      />
                      <Form.Control
                        onChange={handleChange}
                        value={mailing.mail}
                        placeholder="Mail"
                        name="mail"
                        type="email"
                        className="mb-1"
                      />
                      <Form.Control
                        onChange={handleChange}
                        value={mailing.message}
                        placeholder="Mensaje"
                        name="message"
                        as="textarea"
                        rows={3}
                        className="mb-2"
                      />
                      {formLoading ? (
                        <Spinner />
                      ) : (
                        <Button
                          size="sm"
                          onClick={handleSubmit}
                          text="Enviar"
                          type="outline-secondary"
                        />
                      )}
                    </Form>
                    <span
                      className={
                        !err.status
                          ? "d-none"
                          : "d-flex pt-1 justify-content-end w-100 text-danger fs-6"
                      }
                    >
                      {err.message}
                    </span>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Container>
      )}
    </>
  );
}

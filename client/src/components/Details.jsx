import { useEffect, useState } from "react";
import { getData } from "../apis/main";
import Swal from "sweetalert2";
import Loader from "../pages/Loader";
import { Card, Col, Container, Form } from "react-bootstrap";
import Button from "./Button";

export default function Details() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({ status: false, id: 0 });
  const [mailing, setMailing] = useState({ name: "", mail: "", message: "" });

  useEffect(() => {
    handleData();
  }, []);

  const handleChange = (e) => {
    setMailing((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(mailing);
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

  return data.length < 1 ? (
    <span>Sin inmuebles que mostrar</span>
  ) : (
    <Container className="d-flex justify-content-evenly mt-4">
      {data.map(({ id, nombre, descripcion }) => {
        return (
          <Col key={id}>
            <Card className="shadow-sm bg-light" style={{ width: "18rem" }}>
              <Card.Header
                className="bg-light text-center"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShow({ status: show.id === id ? !show.status : true, id });
                }}
              >
                <b>{nombre}</b>
              </Card.Header>
              <Card.Body
                className={show.status && id === show.id ? "" : "d-none"}
              >
                <Card.Img></Card.Img>
                <Card.Text>{descripcion}</Card.Text>
              </Card.Body>
              <Card.Footer
                className={show.status && id === show.id ? "" : "d-none"}
              >
                <Form onSubmit={handleSubmit}>
                  <Form.Label>Envianos tu consulta!</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    placeholder="Nombre"
                    name="name"
                    type="text"
                    className="mb-1"
                  />
                  <Form.Control
                    onChange={handleChange}
                    placeholder="Mail"
                    name="mail"
                    type="email"
                    className="mb-1"
                  />
                  <Form.Control
                    onChange={handleChange}
                    placeholder="Mensaje"
                    name="message"
                    as="textarea"
                    rows={3}
                    className="mb-1"
                  />
                  <Button
                    size="sm"
                    onClick={handleSubmit}
                    text="Enviar"
                    type="outline-secondary"
                  />
                </Form>
              </Card.Footer>
            </Card>
          </Col>
        );
      })}
    </Container>
  );
}

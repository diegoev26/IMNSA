import { Button } from "react-bootstrap";

export default function BtnLogin({ text, type, onClick }) {
  return (
    <Button onClick={onClick} variant={type}>
      {text}
    </Button>
  );
}

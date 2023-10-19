import { Button } from "react-bootstrap";

export default function Btn({ text, type, onClick, size }) {
  return (
    <Button onClick={onClick} variant={type} size={size}>
      {text}
    </Button>
  );
}

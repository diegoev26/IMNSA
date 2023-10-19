import { Button } from "react-bootstrap";

export default function Btn({ text, type, onClick }) {
  return (
    <Button onClick={onClick} variant={type}>
      {text}
    </Button>
  );
}

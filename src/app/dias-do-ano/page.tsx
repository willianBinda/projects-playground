"use client";
import { useState } from "react";
import "./locals.css";
import { Col, Form, Row } from "react-bootstrap";

export default function Home() {
  const [anoInicial, setAnoInicial] = useState("");
  const [anoFinal, setAnoFinal] = useState("");

  const handleResult = () => {
    const inicio = new Date(anoInicial).getTime();
    const fim = new Date(anoFinal).getTime();

    // Calcula a diferença em milissegundos
    const diferencaEmMilissegundos = fim - inicio;

    // Converte milissegundos para dias
    const dias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);

    return dias;
  };

  return (
    <div className="container mt-5">
      <Row>
        <Col md={3}>
          <Form.Group controlId="final">
            <Form.Label>Ano inicial</Form.Label>
            <Form.Control
              type="date"
              value={anoInicial}
              onChange={(e) => setAnoInicial(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="final">
            <Form.Label>Ano final</Form.Label>
            <Form.Control
              type="date"
              value={anoFinal}
              onChange={(e) => setAnoFinal(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </Form.Group>
        </Col>
      </Row>
      <div>total de dias: {handleResult() || 0}</div>
    </div>
  );
}

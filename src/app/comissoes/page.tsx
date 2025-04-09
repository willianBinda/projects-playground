"use client";
import "./locals.css";
import { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Row, Table } from "react-bootstrap";

export default function Home() {
  const [vendedores, setVendedores] = useState([
    {
      nome: "Vendedor 1",
      produtos: [
        { nome: "Produto A", valor: 100.0, data: "2025-04-01" },
        { nome: "Produto B", valor: 150.5, data: "2025-04-02" },
        { nome: "Produto C", valor: 200.0, data: "2025-03-15" },
      ],
    },
    {
      nome: "Vendedor 2",
      produtos: [
        { nome: "Produto D", valor: 80.0, data: "2025-03-10" },
        { nome: "Produto E", valor: 120.0, data: "2025-04-05" },
        { nome: "Produto F", valor: 180.0, data: "2025-03-25" },
      ],
    },
    {
      id: 3,
      nome: "Vendedor 3",
      produtos: [
        { nome: "Produto D", valor: 80.0, data: "2025-03-10" },
        { nome: "Produto E", valor: 120.0, data: "2025-04-05" },
        { nome: "Produto F", valor: 180.0, data: "2025-03-25" },
      ],
    },
  ]);

  const [novoVendedor, setNovoVendedor] = useState("");
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");

  // Função para calcular comissão (Exemplo simples de comissão)
  const calculaComissao = (valorTotal: number) => {
    if (valorTotal <= 1000) return valorTotal * 0.05;
    if (valorTotal <= 10000) return valorTotal * 0.1;
    if (valorTotal <= 100000) return valorTotal * 0.2;
    return valorTotal * 0.3;
  };

  const handleConfirmarVenda = () => {
    if (!novoVendedor) {
      alert("Selecione ou crie um vendedor.");
      return;
    }
    if (!produto || !valor) {
      alert("Preencha todos os campos de produto e valor.");
      return;
    }

    // Cria o novo produto
    const novoProduto = {
      nome: produto,
      valor: parseFloat(valor),
      data: new Date().toISOString().split("T")[0],
    };

    const exist = vendedores.find((e) => e.nome === novoVendedor);
    if (exist) {
      setVendedores((prevVendedores) => {
        const updatedVendedores = prevVendedores.map((vendedor) => {
          if (vendedor.nome === novoVendedor) {
            return {
              ...vendedor,
              produtos: [...vendedor.produtos, novoProduto],
            };
          }
          return vendedor;
        });

        return updatedVendedores;
      });
    } else {
      vendedores.push({
        nome: novoVendedor,
        produtos: [novoProduto],
      });
    }
    // Adiciona o produto ao vendedor

    // Limpa os campos após adicionar a venda
    setProduto("");
    setValor("");
    setNovoVendedor("");
  };

  const filtrarPorData = (
    produtos: { nome: string; valor: number; data: string }[]
  ) => {
    if (!dataFiltro) return produtos;
    return produtos.filter(
      (produto) => produto.data.substring(0, 7) === dataFiltro.substring(0, 7) // Filtra pelo mês (ano-mês)
    );
  };

  useEffect(() => {
    // Setando a data atual como valor padrão no filtro (ano-mês)
    const currentDate = new Date();
    const currentMonth = currentDate
      .toISOString()
      .split("T")[0]
      .substring(0, 7);
    setDataFiltro(currentMonth);
  }, []);

  return (
    <div className="container mt-5">
      <h2>Vendedores</h2>
      <Form.Group controlId="dataFiltro">
        <Form.Label>Filtrar por Mês</Form.Label>
        <Form.Control
          className="w-50"
          type="month"
          value={dataFiltro}
          onChange={(e) => setDataFiltro(e.target.value)}
        />
      </Form.Group>
      <Accordion>
        {vendedores.map((vendedor, i) => {
          const produtosFiltrados = filtrarPorData(vendedor.produtos);
          return (
            <Accordion.Item eventKey={`${i}`} key={i}>
              <Accordion.Header>{vendedor.nome}</Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Produto</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtosFiltrados.map((produto, index) => {
                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{produto.nome}</td>
                          <td>{produto.valor}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <Row>
                  <Col md={8}>
                    <p>R$ 0,01 a R$ 1.000,00 = 5% de comissão</p>
                    <p>R$ 1.000,01 a R$ 10.000,00 = 10% de comissão</p>
                    <p>R$ 10.000,01 a R$ 100.000,00 = 20% de comissão</p>
                    <p>R$ 100.000,01 a R$ 1.000.000,00 = 30% de comissão</p>
                  </Col>
                  <Col md={4}>
                    Total vendido:{" "}
                    {produtosFiltrados
                      .reduce((prodAcc, produto) => prodAcc + produto.valor, 0)
                      .toFixed(2)}
                    <br />
                    Comissão final:{" "}
                    {calculaComissao(
                      produtosFiltrados.reduce(
                        (prodAcc, produto) => prodAcc + produto.valor,
                        0
                      )
                    ).toFixed(2)}
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>

      <h3 className="mt-5">Adicionar Venda</h3>
      <Form>
        <Form.Group controlId="vendedorInput">
          <Form.Label>Selecione o Vendedor ou Crie um Novo</Form.Label>
          <Form.Control
            list="vendedoresList"
            type="text"
            value={novoVendedor}
            onChange={(e) => {
              setNovoVendedor(e.target.value);
            }}
            placeholder="Escolha ou digite o nome do vendedor"
          />
          <datalist id="vendedoresList">
            {vendedores.map((vendedor, inde) => (
              <option key={inde} value={vendedor.nome} />
            ))}
          </datalist>
        </Form.Group>

        <Form.Group controlId="produto">
          <Form.Label>Produto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome do produto"
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="valor" className="mt-3">
          <Form.Label>Valor</Form.Label>
          <Form.Control
            type="number"
            placeholder="Valor do produto"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          className="mt-4"
          onClick={handleConfirmarVenda}
        >
          Confirmar Venda
        </Button>
      </Form>
    </div>
  );
}

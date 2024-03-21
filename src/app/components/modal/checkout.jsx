import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CardCheckout from "../card/playerCheckout";

export default function ModalCheckout({
  handleCloseCheckout,
  database,
  setDatabase,
}) {
  const pago = database.filter((i) => i.pg === true);
  const pagoClube = database.filter((i) => i.pgClube === true);

  function createConsolidado() {
    const resultado = {};

    // Itera através de cada pedido
    database.forEach((pedido) => {
      const nome = pedido.nome; // Extrai o nome do pedido
      // Se o nome já foi adicionado ao resultado, atualiza o contador de vendas e verifica pgClube e pg
      if (resultado[nome]) {
        resultado[nome].vendas++;
        resultado[nome].pgClube = resultado[nome].pgClube && pedido.pgClube;
        resultado[nome].pg = resultado[nome].pg && pedido.pg;
      } else {
        // Senão, inicializa este nome no resultado com uma venda, pgClube e pg
        resultado[nome] = {
          nome,
          vendas: 1,
          pgClube: pedido.pgClube,
          pg: pedido.pg,
        };
      }
    });

    // Converte o objeto de resultados em uma lista de valores e ordena pela chave 'nome'
    return Object.values(resultado).sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });
  }

  const [consolidado, setConsolidado] = useState(createConsolidado());

  function handleClick(comprador, aux) {
    const newDatabase = database;
    newDatabase.forEach((i) => {
      if (i.nome == comprador.nome) {
        switch (aux) {
          case "pressed-debito":
            i.pg = true;
            i.pgClube = false;
            break;
          case "pressed-pg":
            i.pg = false;
            i.pgClube = true;
            break;
          case "pressed-pgclube":
            i.pg = false;
            i.pgClube = false;
            break;
        }
      }
      setDatabase(newDatabase);
      setConsolidado(createConsolidado());
    });
  }

  return (
    <>
      <Box>
        <Box position="absolute" right={0} top={0}>
          <IconButton onClick={handleCloseCheckout}>
            <CloseIcon />
          </IconButton>
        </Box>
        <p>Vendidos: {database.length}</p>
        <p>
          Total: R$ {database.length * process.env.NEXT_PUBLIC_UNIT_PRICE}.00
        </p>
        <p>Pago: R$ {pago.length * process.env.NEXT_PUBLIC_UNIT_PRICE}.00</p>
        <p>
          Pago ao clube: R${" "}
          {pagoClube.length * process.env.NEXT_PUBLIC_UNIT_PRICE}.00
        </p>
        <p>
          Faltam: R${" "}
          {(database.length - pago.length - pagoClube.length) *
            process.env.NEXT_PUBLIC_UNIT_PRICE}
          .00
        </p>
        {consolidado.map((value, index) => {
          return (
            <CardCheckout key={index} value={value} handleClick={handleClick} />
          );
        })}
      </Box>
      <button
        onClick={() => {
          if (window.confirm("Tem certeza que deseja resetar?")) {
            setDatabase([]);
            handleCloseCheckout();
          }
        }}
      >
        RESET
      </button>
    </>
  );
}

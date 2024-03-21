import { Box, Typography } from "@mui/material";
import { useState } from "react";

export default function CardLinhaProducao({
  value,
  database,
  setDatabase,
  onDelete,
}) {
  const cardStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ccc",
    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    padding: "10px 20px", // Reduzi o padding para tornar o Box mais compacto
    margin: "10px 0", // Margem reduzida para deixar mais compacto
    overflow: "hidden", // Esconde o texto que ultrapassar o tamanho do box
  };

  // Estilos para o texto que pode ser muito longo
  const textStyleOverflow = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis", // Adiciona "..." se o texto for muito longo
  };

  const handleClick = () => {
    const updatedDatabase = database.map((item) => {
      if (item.id === value.id) {
        return { ...item, produzido: !item.produzido }; // Inverte o valor de 'produzido'
      }
      return item;
    });
    setDatabase(updatedDatabase);
  };

  const [pressTimer, setPressTimer] = useState(null);

  // Função para lidar com o início do clique ou toque
  const handlePressStart = () => {
    // Defina um temporizador para executar o console.log após 500 ms (meio segundo)
    const timer = setTimeout(() => {
      handleDelete();
    }, 800); // Ajuste o tempo conforme necessário

    setPressTimer(timer);
  };

  // Função para lidar com o fim do clique ou toque
  const handlePressEnd = () => {
    // Limpa o temporizador se o usuário soltar antes do tempo
    clearTimeout(pressTimer);
  };

  function handleDelete() {
    onDelete(value.id);
  }

  return (
    <div
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd} // Adicionado para lidar com o caso em que o mouse sai do componente antes de soltar
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
    >
      <Box sx={cardStyle}>
        <Typography sx={textStyleOverflow} variant="body1" component="div">
          {value.nome}
        </Typography>
        <div onClick={handleClick}>
          <Typography variant="body2" color={value.produzido ? "green" : "red"}>
            {value.produzido ? "Concluído" : "Em produção"}
          </Typography>
          <Typography variant="body2">{value.tipo}</Typography>
        </div>
      </Box>
    </div>
  );
}

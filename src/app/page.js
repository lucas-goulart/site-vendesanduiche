"use client";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ModalAdd from "./components/modal/add";
import CardLinhaProducao from "./components/card/linhaProd";
import ModalCheckout from "./components/modal/checkout";

// Estilos para o modal
// Estilos para o modal
const styleAdd = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Largura do modal baseada na largura da tela
  maxWidth: "70vw", // Largura máxima do modal
  maxHeight: "75vh", // Altura máxima do modal, baseada na altura da tela
  overflow: "visible", // Mantém o conteúdo horizontal dentro do modal, sem scroll
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const styleCheckout = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Largura do modal baseada na largura da tela
  maxWidth: "70vw", // Largura máxima do modal
  maxHeight: "75vh", // Altura máxima do modal, baseada na altura da tela
  overflowY: "auto", // Adiciona scroll vertical se o conteúdo exceder a altura máxima
  overflowX: "hidden", // Mantém o conteúdo horizontal dentro do modal, sem scroll
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalCheckout, setOpenModalCheckout] = useState(false);
  const handleOpenAdd = () => setOpenModalAdd(true);
  const handleCloseAdd = () => setOpenModalAdd(false);
  const handleOpenCheckout = () => setOpenModalCheckout(true);
  const handleCloseCheckout = () => setOpenModalCheckout(false);

  const [database, setDatabaseReal] = useState([]);

  useEffect(() => {
    const databaseString = localStorage.getItem("db_sanduiches");
    const parsedDatabase = JSON.parse(databaseString) || [];
    setDatabase(parsedDatabase);
  }, []);

  function setDatabase(database) {
    localStorage.setItem("db_sanduiches", JSON.stringify(database));
    setDatabaseReal(database);
  }
  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <AddCircleIcon
          fontSize="large"
          sx={{ m: "1em" }}
          onClick={handleOpenAdd}
        />
        <PointOfSaleIcon
          fontSize="large"
          sx={{ m: "1em" }}
          onClick={handleOpenCheckout}
        />
      </Box>

      <Modal
        open={openModalAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleAdd}>
          <ModalAdd
            handleCloseAdd={handleCloseAdd}
            database={database}
            setDatabase={setDatabase}
          />
        </Box>
      </Modal>

      <Modal
        open={openModalCheckout}
        onClose={handleCloseCheckout}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleCheckout}>
          <ModalCheckout
            handleCloseCheckout={handleCloseCheckout}
            database={database}
            setDatabase={setDatabase}
          />
        </Box>
      </Modal>
      <Box overflow={"scroll"} maxHeight={"80vh"}>
        {database.map((value, index) => {
          return (
            <CardLinhaProducao
              key={index}
              value={value}
              database={database}
              setDatabase={setDatabase}
              onDelete={(id) => {
                const newDatabase = database.filter((item) => item.id !== id);
                setDatabase(newDatabase);
              }}
            />
          );
        })}
      </Box>
    </>
  );
}

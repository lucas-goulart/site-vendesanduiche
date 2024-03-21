import React, { useState } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormGroup,
  Box,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ModalAdd({ handleCloseAdd, database, setDatabase }) {
  const [nome, setNome] = useState("");
  const [escolha, setEscolha] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [produtos] = useState(["Misto Quente", "Queijo Quente"]);

  const uniqueNames = Array.from(new Set(database.map((item) => item.nome)));

  const filteredSuggestions = uniqueNames.filter((nomeDb) =>
    nomeDb.toLowerCase().includes(nome.toLowerCase())
  );

  const handleChange = (event) => {
    setEscolha(escolha === event.target.name ? "" : event.target.name);
  };

  const handleNameChange = (event) => {
    setNome(event.target.value);
    setShowSuggestions(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = {
      id: database.length + 1,
      nome,
      tipo: escolha,
      pgClube: false,
      pg: false,
      produzido: false,
    };

    const newDatabase = [...database, newEntry];
    newDatabase.sort((a, b) => b.id - a.id);
    setDatabase(newDatabase);

    handleCloseAdd();
  };

  const isFormValid = nome.trim() !== "" && escolha !== "";

  const handleSuggestionClick = (nomeSugestao) => {
    setNome(nomeSugestao);
    setShowSuggestions(false);
  };

  return (
    <>
      <Box position="relative">
        <Box position="absolute" right={-25} top={-25}>
          <IconButton onClick={handleCloseAdd}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            variant="outlined"
            value={nome}
            onChange={handleNameChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            fullWidth
            margin="normal"
          />
          {showSuggestions && nome && (
            <Paper
              style={{
                position: "absolute",
                bottom: "100%", // Isso faz o componente começar exatamente acima do TextField
                maxHeight: "200px", // Você pode ajustar isso conforme necessário
                overflowY: "auto", // Isso permite que a lista seja rolável se exceder a altura máxima
                zIndex: 1000,
                width: "100%", // Isso faz o Paper ter a mesma largura do TextField
              }}
            >
              <List>
                {filteredSuggestions.map((suggestion, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <ListItemText primary={suggestion} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
          <FormGroup>
            {produtos.map((produto, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={escolha === produto}
                    onChange={handleChange}
                    name={produto}
                  />
                }
                label={produto}
              />
            ))}
          </FormGroup>
          <Box textAlign="center" mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isFormValid}
            >
              Confirma
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

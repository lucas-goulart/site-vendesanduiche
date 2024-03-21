import { Box, Typography } from "@mui/material";

export default function CardCheckout({ value, handleClick }) {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        padding: "10px 20px",
        margin: "10px 0",
        overflow: "hidden",
      }}
    >
      <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
        {value.nome}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="body1">
          {value.vendas}x - {value.vendas === 1 ? "Sanduíche" : "Sanduíches"}
        </Typography>
        <Box
          sx={{ flexGrow: 1, marginX: "10px", borderBottom: "1px dotted #ccc" }}
        ></Box>
        <Typography variant="body1">
          R${value.vendas * process.env.NEXT_PUBLIC_UNIT_PRICE}.00
        </Typography>
      </Box>
      <Box textAlign={"center"}>
        <Typography
          variant="body1"
          sx={{
            cursor: "pointer",
            color: value.pg || value.pgClube ? "green" : "transparent",
          }}
          onClick={() => handleClick(value, "pressed-pg")}
        >
          {value.pg && "Pago"}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            cursor: "pointer",
            color: value.pgClube ? "green" : "transparent",
          }}
          onClick={() => handleClick(value, "pressed-pgclube")}
        >
          {value.pgClube && "Pago ao Clube"}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            cursor: "pointer",
            color: !value.pg && !value.pgClube ? "red" : "transparent",
          }}
          onClick={() => handleClick(value, "pressed-debito")}
        >
          {!value.pg && !value.pgClube && "Em débito"}
        </Typography>
      </Box>
    </Box>
  );
}

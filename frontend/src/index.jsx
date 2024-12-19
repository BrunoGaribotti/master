import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme"; // Importa el archivo de tema personalizado
import App from "./App";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Resetea estilos globales */}
        <App />
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
);

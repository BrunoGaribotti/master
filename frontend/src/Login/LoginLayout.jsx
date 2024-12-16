import React from "react";
import { styled } from "@mui/material/styles";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import LoginForm from "./LoginForm";

// Estilos usando la API `styled`
const Root = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh", // Asegura que el contenedor ocupe toda la pantalla
  display: "flex", // Utiliza flexbox para alinear los elementos
  justifyContent: "center", // Centrado horizontal
  alignItems: "center", // Centrado vertical
  overflow: "hidden", // Evita el scroll
}));

const PaperContainer = styled("div")(({ theme }) => ({
  width: "40%", // El contenedor ocupará el 50% de la pantalla
  margin: "0 auto", // Centra el contenedor de forma horizontal
  padding: `0 50px`, // Aplica un padding de 16px (2 * 8px) en los lados
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "white",
    borderRadius: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    maxWidth: "100%", // Asegura que el Paper no se salga de su contenedor
    height: "auto", // Ajuste automático de la altura
    width: "440px", // Ancho fijo para el Paper
    margin: "0 auto", // Centra horizontalmente el Paper
  }));
  

const ImageContainer = styled("div")(({ theme }) => ({
  flex: 1, // Toma el 50% restante del espacio
  height: "100vh", // Asegura que la imagen ocupe toda la altura
  backgroundImage: `url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp")`,
  backgroundSize: "cover", // Asegura que la imagen cubra el contenedor
  backgroundPosition: "center", // Ajusta la posición de la imagen
}));

export default function LoginLayout({ children }) {
  return (
    <Root>
      {/* Contenedor con el formulario */}
      <PaperContainer>
        <StyledPaper elevation={24}>
          [logo] Iniciar sesión
          <LoginForm />
        </StyledPaper>
      </PaperContainer>
      <ImageContainer />
    </Root>
  );
}

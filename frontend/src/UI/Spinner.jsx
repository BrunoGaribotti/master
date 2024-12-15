import React from "react";
import { CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

const Container = styled('div')(({ theme, height }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 1,
  height: height || 283,
}));

const Spinner = ({ height }) => {
  return (
    <Container height={height}>
      <CircularProgress />
    </Container>
  );
};

export default Spinner;
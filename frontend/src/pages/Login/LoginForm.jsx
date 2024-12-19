import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "../../hooks/use-form";
import { Link } from "react-router-dom";

const Form = ({ isLoading, submitHandler }) => {
  const [form, onChangeHandler] = useForm({
    email: "",
    password: "",
  });

  const onClickHandler = async (e) => {
    e.preventDefault();
    let data = {
      email: form.email.value,
      password: form.password.value,
    };

    submitHandler(data);
  };

  const disabled =
    !form.email.isValid ||
    form.email.value === "" ||
    !form.password.isValid ||
    form.password.value === "";

  return !isLoading ? (
    <Box
      component="form"
      onSubmit={onClickHandler}
      sx={{
        width: "100%",
        mt: 1,
      }}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        type="email"
        autoFocus
        value={form.email.value}
        onChange={onChangeHandler}
        inputProps={{
          maxLength: 256,
          pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
        }}
        error={!form.email.isValid}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={form.password.value}
        onChange={onChangeHandler}
        inputProps={{
          pattern: "[a-zA-Z0-9@#!$&?.*]*$",
          minLength: 8,
        }}
        error={!form.password.isValid}
      />
        <Link to="cambiar-contraseña" style={{ color: "blue", textDecoration: "underline" }}>
          Olvidé mi contraseña
        </Link>
      <Button
        disabled={disabled}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{
          mt: 3,
          mb: 2,
        }}
      >
        Ingresar
      </Button>
      <div>No tenés cuenta? Registrarse[link]</div>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100px",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Form;

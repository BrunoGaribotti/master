import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useForm } from "../hooks/use-form";
import Spinner from "../UI/Spinner";

// Reemplaza makeStyles con styled
const FormContainer = styled('form')(({ theme }) => ({
  width: '100%', // Fix IE 11 issue
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

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
    <FormContainer onSubmit={onClickHandler}>
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
      <SubmitButton
        disabled={disabled}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Ingresar
      </SubmitButton>
    </FormContainer>
  ) : (
    <Spinner />
  );
};

export default Form;
import React from "react";
import LoginForm from "../../components/Login/Form";
import { logInRoot } from "../../Redux/Action/userActions";
import { useDispatch } from "react-redux";

import LoginLayout from "../../components/Shared/LoginLayout";

export default function Login() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);

  const submitHandler = (data) => {
    setIsLoading(true);
    dispatch(logInRoot(data, setIsLoading));
  };

  return (
    <LoginLayout>
      <LoginForm isLoading={isLoading} submitHandler={submitHandler} />
    </LoginLayout>
  );
}

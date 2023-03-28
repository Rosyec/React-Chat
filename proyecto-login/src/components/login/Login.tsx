import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { RootState } from "../../store/store";
import { loginUserFacebook, loginUserGoogle } from "../../store/thunks";
import { ButtonFacebook, ButtonGoogle } from "./Login.styled";

export const Login = () => {

  const dispatch = useAppDispatch();
  const user = useAppSelector( (state: RootState) => state.login );
  const navigate = useNavigate();

  useEffect(() => {
    if (user.displayName) {
      navigate('/app/home');
    }
  }, [user]);

  const onLoginFacebook = async () => {
    dispatch(loginUserFacebook());
  };

  const onLoginGoogle = async () => {
    dispatch(loginUserGoogle());
  };

  return (
    <>
      <h1>Iniciar sesión</h1>
      <hr />
      <ButtonFacebook onClick={() => onLoginFacebook()}>
        <i className="bi bi-facebook"></i> Facebook
      </ButtonFacebook>
      <ButtonGoogle onClick={() => onLoginGoogle()}>
        <i className="bi bi-google"></i> Google
      </ButtonGoogle>
    </>
  );
};

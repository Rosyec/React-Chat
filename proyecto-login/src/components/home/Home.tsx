import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../firebase/firebase.auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { login } from "../../store/slices/LoginSlice";
import { RootState } from "../../store/store";
import { Chat } from "../chat/Chat";
import { Photo } from "./Home.styled";

export const Home = () => {
  const User = useAppSelector((state: RootState) => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const localUser: User =
      JSON.parse(localStorage.getItem("user") || "null") || Data;
    dispatch(login(localUser));
  }, [User]);

  useEffect(() => {
    if (User.displayName === null) {
      navigate("/login");
    }
  }, [User]);

  const onLogout = () => {
    logout();
    localStorage.removeItem("user");
    dispatch(login(Data));
  };

  return (
    <>
      <div className="header">
        <div className="photo">
          <Photo
            src={User.photoURL + "?access_token=" + User.token + "&type=large"}
            referrerPolicy="no-referrer"
          />
        </div>
        <h2>{User.displayName}</h2>
        <h1>Chat Global</h1>
        <Chat/>
      </div>
      <button onClick={onLogout}>
        <i className="bi bi-box-arrow-left"></i> Salir
      </button>
    </>
  );
};

const Data: User = {
  displayName: null,
  email: null,
  uid: null,
  photoURL: null,
  token: null,
};

interface User {
  displayName: string | null;
  email: string | null;
  uid: string | null;
  photoURL: string | null;
  token: string | null;
}

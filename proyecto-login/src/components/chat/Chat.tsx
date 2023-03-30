import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useAppSelector } from "../../store/hooks/hooks";
import { RootState } from "../../store/store";
import {
  ClientToServerEvents,
  Message,
  ServerToClientEvents,
} from "../helpers/interfaces";
import {
  ButtonSend,
  Container,
  Footer,
  InputMessage,
  MessagessContainer,
} from "./Chat.styled";
import { useForm } from "./hooks/useForm";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  // "http://localhost:3550"
  "https://chat-socket.azurewebsites.net"
); // Inicializa el socket.io-client fuera de la función

export const Chat = () => {
  const User = useAppSelector((state: RootState) => state.login);
  const [messagess, setMessagess] = useState<Message[]>([]);
  const { onInputChange, onReset, message } = useForm({ message: "" });
  const [canSendMessage, setCanSendMessage] = useState(true);

  const sendMessage = () => {
    if (!canSendMessage) {
      console.log("Demasiados mensajes enviados en un corto período de tiempo");
      return;
    }
    socket.emit("clientMessage", {
      displayName: User.displayName!,
      message: message,
      email: User.email!,
      uid: User.uid!,
      token: User.token!,
      photoURL: User.photoURL!,
    });
    setCanSendMessage(false);
  };

  useEffect(() => {
    // Después de 3 segundos, se puede volver a enviar otro mensaje
    const timeout = setTimeout(() => {
      setCanSendMessage(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [canSendMessage]);

  useEffect(() => {
    socket.on("serverMessage", (data) => {
      setMessagess(data);
      scrollToBottom();
    });
    return () => {
      socket.off("serverMessage", (data) => {
        setMessagess(data);
      });
    };
  }, []);

  useEffect(() => {
    socket.emit("clientSearchMessagess");
  }, []);

  useEffect(() => {
    socket.on("serverSearchMessagess", (data) => {
      setMessagess(data);
    });
    return () => {
      socket.off("serverSearchMessagess", (data) => {
        setMessagess(data);
      });
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messagess]);

  const onEnter = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === "Enter") {
      const { value } = evt.currentTarget;
      if (value.length <= 0) return;
      sendMessage();
      onReset();
    }
  };

  const onButtonSend = () => {
    if (message.length <= 0) return;
    sendMessage();
    onReset();
  };

  const scrollToBottom = () => {
    let divToScroll = document.getElementById("div-scroll");
    if (divToScroll) {
      divToScroll.scrollTop = divToScroll.scrollHeight;
    }
  };

  return (
    <>
      <Container>
        <MessagessContainer id="div-scroll">
          {messagess.map(
            ({ displayName, email, photoURL, token, message }, index) => {
              return (
                <div key={index} className="message__input">
                  {/* <span style={{flexGrow: `${ email === User.email ? 0 : 0 }`}}></span> */}
                  <div
                    className="col__message"
                    style={
                      email === User.email
                        ? { flexDirection: "inherit", justifyContent: "right" }
                        : {
                            flexDirection: "row-reverse",
                            justifyContent: "left",
                          }
                    }
                  >
                    <div
                      className="message__text"
                      style={
                        email !== User.email
                          ? { backgroundColor: "blueviolet", color: "white" }
                          : { backgroundColor: "#F3F4F6", color: "black" }
                      }
                    >
                      <span id="displayName"> {displayName} </span>
                      <span>{message}</span>
                    </div>
                    <div className="message__picture">
                      <img
                        style={{ height: "2em", width: "2em" }}
                        src={
                          photoURL.includes("graph.facebook.com")
                            ? photoURL +
                              "?access_token=" +
                              token +
                              "&type=large"
                            : photoURL
                        }
                        referrerPolicy="no-referrer"
                        alt="Profile"
                      />
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </MessagessContainer>
        <Footer>
          <InputMessage
            onKeyUp={(evt) => onEnter(evt)}
            placeholder="Escribir..."
            name="message"
            onChange={onInputChange}
            value={message}
            autoComplete="$"
          />
          <ButtonSend onClick={onButtonSend}>
            <i className="bi bi-send"></i>
          </ButtonSend>
        </Footer>
      </Container>
    </>
  );
};

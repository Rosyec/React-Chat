export interface ServerToClientEvents {
  serverMessage: (message: Message[]) => void;
  serverSearchMessagess: (message: Message[]) => void;
}

export interface ClientToServerEvents {
  clientMessage: (message: Message) => void;
  clientSearchMessagess: () => void;
}


export interface Message {
  displayName: string,
  email: string,
  uid: string,
  token: string,
  photoURL: string,
  message: string
}
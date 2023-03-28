import { Schema, model } from "mongoose";

const Message: Schema = new Schema({
  displayName: String,
  email: String,
  uid: String,
  token: String,
  photoURL: String,
  message: String
});

const messageModel = model("message", Message);

export { messageModel };
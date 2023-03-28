"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageModel = void 0;
const mongoose_1 = require("mongoose");
const Message = new mongoose_1.Schema({
    displayName: String,
    email: String,
    uid: String,
    token: String,
    photoURL: String,
    message: String
});
const messageModel = (0, mongoose_1.model)("message", Message);
exports.messageModel = messageModel;

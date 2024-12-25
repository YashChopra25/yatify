import { Router } from "express";

const MessageRouter = Router();

import MessageController from "../controllers/MesssageController.js";

MessageRouter.post("/send-message", MessageController.sendMessage);
MessageRouter.get(
  "/get-messages",
  MessageController.getMessagesForOpeningChats
);

export default MessageRouter;

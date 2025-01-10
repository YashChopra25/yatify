import { Router } from "express";
import MessageController from "../controllers/MesssageController.js";

const MessageRouter = Router();

MessageRouter.post("/send-message", MessageController.sendMessage);
MessageRouter.get("/", MessageController.getAllMessagesOfLoginedUser);
MessageRouter.get(
  "/get-messages",
  MessageController.getMessagesForOpeningChats
); //this is opened chat only

export default MessageRouter;

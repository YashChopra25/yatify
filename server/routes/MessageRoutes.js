import { Router } from "express";
import MessageController from "../controllers/MesssageController.js";
import Message from "../models/messageModel.js";

const MessageRouter = Router();

MessageRouter.post("/send-message", MessageController.sendMessage);
MessageRouter.get("/", MessageController.getAllMessagesOfLoginedUser);
MessageRouter.get(
  "/get-messages",
  MessageController.getMessagesForOpeningChats
); //this is opened chat only

MessageRouter.get("/huppp", async (req, res) => {
  try {

    const createdd=new Message({
      content:"hello",
      createdAt:Date.now(),
      updatedAt:Date.now(), 
      sender:"6779a4c240d9a23561a8be56",
      receiver:"677c12bb2312cd78273441b4"
    })  
    await createdd.save()
    console.log(createdd)
    return res.send(createdd)


  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});
export default MessageRouter;

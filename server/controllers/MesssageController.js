import Message from "../models/messageModel.js";
import { CustomError } from "../utils/error.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
const NotToShowInUserFetching = {
  password: 0,
  salt: 0,
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};
class MessageControllerClass {
  async sendMessage(req, res) {
    try {
      const { message } = req.body;
      const { sender, receiver } = req;

      if (!sender || !receiver) {
        throw new CustomError(
          "sender or receiver were not found,their must be an sender or receiver to send/receive message.",
          404
        );
      }

      if (!message || message.trim() === "") {
        return res
          .status(400)
          .send({ message: "Empty message can't be sent." });
      }

      const newMessage = await Message.create({
        sender: sender._id,
        receiver: receiver._id,
        content: message,
      });
      if (!newMessage) {
        return res
          .status(400)
          .json({ success: false, message: "Failed to send message." });
      }
      const fetchMessage = await Message.findById(newMessage._id)
        .populate("sender", NotToShowInUserFetching)
        .populate("receiver", NotToShowInUserFetching);

      return res.status(201).json({ success: true, message: fetchMessage });
    } catch (error) {
      ErrorHandler(error, req, res);
    }
  }

  async getMessagesForOpeningChats(req, res) {
    try {
      const receiver = req.user;
      if (!receiver) {
        throw new CustomError("receiver was not found", 404);
      }
      const MessageList = await Message.find({
        receiver: receiver._id,
      })
        .populate("sender", NotToShowInUserFetching)
        .populate("receiver", NotToShowInUserFetching);

      return res.status(200).json({
        success: true,
        message: "All Messages are fetch",
        messageList: MessageList,
      });
    } catch (error) {
      ErrorHandler(error, req, res);
    }
  }
}

const MessageController = new MessageControllerClass();
export default MessageController;

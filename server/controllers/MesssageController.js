import mongoose from "mongoose";
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
const AggregateFn = (sort = -1) => [
  {
    $lookup: {
      from: "users",
      localField: "sender",
      foreignField: "_id",
      as: "sender",
    },
  },
  {
    $unwind: {
      path: "$sender",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "receiver",
      foreignField: "_id",
      as: "receiver",
    },
  },
  {
    $unwind: {
      path: "$receiver",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $sort: {
      createdAt: sort,
    },
  },
  {
    $project: {
      sender: {
        email: 1,
        name: 1,
        username: 1,
        _id: 1,
        imgSrc: 1,
      },
      receiver: {
        email: 1,
        name: 1,
        username: 1,
        _id: 1,
        imgSrc: 1,
      },
      _id: 1,
      content: 1,
      updatedAt: 1,
      createdAt: 1,
      imgSrc: 1,
    },
  },
];
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

      return res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: fetchMessage,
      });
    } catch (error) {
      ErrorHandler(error, req, res);
    }
  }

  async getAllMessagesOfLoginedUser(req, res) {
    try {
      const { _id } = req.user;
      if (!_id || !mongoose.isValidObjectId(_id)) {
        throw new CustomError("Invalid Format for the following fields: _id");
      }
      const pipeline = [
        {
          $match: {
            $or: [
              { sender: new mongoose.Types.ObjectId(_id) },
              { receiver: new mongoose.Types.ObjectId(_id) },
            ],
          },
        },
        {
          $addFields: {
            interactingUser: {
              $cond: {
                if: { $ne: ["$sender", new mongoose.Types.ObjectId(_id)] },
                then: "$sender",
                else: "$receiver",
              },
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "interactingUser",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $unwind: "$userDetails",
        },
        {
          $sort: { createdAt: -1 }, // Sort messages by latest timestamp
        },
        {
          $group: {
            _id: "$interactingUser", // Group by interacting user
            latestMessage: { $first: "$content" }, // Keep the latest message
            latestMessageTime: { $first: "$createdAt" }, // Keep the timestamp of the latest message
            user: { $first: "$userDetails" }, // Keep the user's details
          },
        },
        {
          $project: {
            _id: 1, // Retain the interacting user's ID
            user: {
              _id:"$user._id",
              name: "$user.name",
              email: "$user.email",
              username: "$user.username",
              imgSrc: "$user.imgSrc",
            },
            latestMessage: 1,
            latestMessageTime: 1,
          },
        },
        {
          $sort: { latestMessageTime: -1 }, // Sort final output by the latest message time
        },
      ];

      const messages = await Message.aggregate(pipeline);
      return res.status(200).json({
        success: true,
        message: "All loggedIn user messages",
        data: messages || [],
      });
    } catch (error) {
      ErrorHandler(error, req, res);
    }
  }

  async getMessagesForOpeningChats(req, res) {
    try {
      const receiver = req.receiver;
      if (!receiver) {
        throw new CustomError("receiver was not found", 404);
      }
      const MatchFn = {
        $match: {
          $and: [
            {
              sender: {
                $in: [
                  new mongoose.Types.ObjectId(req.user._id),
                  new mongoose.Types.ObjectId(receiver._id),
                ],
              },
            },
            {
              receiver: {
                $in: [
                  new mongoose.Types.ObjectId(req.user._id),
                  new mongoose.Types.ObjectId(receiver._id),
                ],
              },
            },
          ],
        },
      };
      const pipeline = [MatchFn, ...AggregateFn(1)];
      const MessageList = await Message.aggregate(pipeline);

      return res.status(200).json({
        success: true,
        message: "All Messages are fetch",
        data: MessageList,
      });
    } catch (error) {
      ErrorHandler(error, req, res);
    }
  }
}

const MessageController = new MessageControllerClass();
export default MessageController;

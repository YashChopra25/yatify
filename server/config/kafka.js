import { Kafka, logLevel } from "kafkajs";
import Message from "../models/messageModel.js";

const kafka = new Kafka({
  clientId: "chat-app-by-yash",
  brokers: ["172.18.0.5:9092"], // 'kafka' is the hostname of the Kafka container
  logLevel: logLevel.ERROR,
});

async function initKafka() {
  try {
    console.log("Kafka Admin connecting.....");
    const admin = kafka.admin();
    await admin.connect();
    console.log("Kafka Admin connected");
    await admin.createTopics({
      topics: [
        {
          topic: "message",
          numPartitions: 1,
          replicationFactor: 1,
        },
      ],
    });
    await admin.disconnect();
  } catch (error) {
    console.error("Failed to connect to Kafka:", error);
    setTimeout(initKafka, 5000); // Retry every 5 seconds
  }
}
initKafka();

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "chat-app-by-yash" });
async function KafkaProducer(topic, message) {
  await producer.connect();
  console.log("Producer connected");
  producer.send({
    topic: topic,
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
  });
}

async function KafkaConsumer(topic) {
  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });
  await consumer.run({
    eachBatch: async ({ batch }) => {
      const messages = batch.messages.map((message) =>
        JSON.parse(message.value.toString())
      );

      // Bulk insert messages into the database
      const formattedMessages = messages.map((msg) => ({
        content: msg.content,
        createdAt: msg.createdAt,
        updatedAt: msg.updatedAt,
        sender: msg.sender._id,
        receiver: msg.receiver._id,
      }));

      try {
        await Message.insertMany(formattedMessages);
        console.log(
          `${formattedMessages.length} messages saved to the database`
        );
      } catch (error) {
        console.error("Error saving batch to the database:", error);
      }
    },
    //this is for process one by one message and save in database this causes problem in the throughtout while scaling
    // eachMessage: async ({ topic, partition, message }) => {
    //   if (topic === "message") {
    //     const messageData = JSON.parse(message.value.toString());
    //     const messageCreate = new Message({
    //       content: messageData.content,
    //       createdAt: messageData.createdAt,
    //       updatedAt: messageData.updatedAt,
    //       sender: messageData.sender._id,
    //       receiver: messageData.receiver._id,
    //     });
    //     await messageCreate.save();
    //     console.log("Message created in the backend too,", messageCreate);
    //   } else {
    //     console.warn("This is not a topic is not subscribed message", topic);

    //     console.log({
    //       topic,
    //       partition,
    //       offset: message.offset,
    //       value: message.value.toString(),
    //     });
    //   }
    // },
  });
}
KafkaConsumer("message");
export { kafka, KafkaProducer, KafkaConsumer };

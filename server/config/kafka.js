import { Kafka, logLevel } from "kafkajs";
import Message from "../models/messageModel.js";

const kafka = new Kafka({
  clientId: "chat-app-by-yash",
  brokers: ["kafka:9092"],
  logLevel: logLevel.ERROR,
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "chat-app-by-yash" });

async function initKafka() {
  try {
    console.log("Kafka Admin connecting.....");
    const admin = kafka.admin();
    await admin.connect();
    console.log("Kafka Admin connected");

    const topicsCreated = await admin.createTopics({
      topics: [
        {
          topic: "message",
          numPartitions: 1,
          replicationFactor: 1,
        },
      ],
    });

    if (topicsCreated) {
      console.log("Topic 'message' created successfully");
    } else {
      console.log("Topic 'message' already exists or no topics created");
    }

    await admin.disconnect();
  } catch (error) {
    console.error("Failed to connect to Kafka Admin:", error.message);
    setTimeout(initKafka, 5000);
  }
}

async function initProducer() {
  try {
    await producer.connect();
    console.log("Kafka Producer connected");
  } catch (error) {
    console.error("Failed to connect Kafka Producer:", error.message);
  }
}

async function KafkaProducer(topic, message) {
  try {
    await producer.connect();
    await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`Message sent to topic "${topic}"`);
  } catch (error) {
    console.error("Failed to send message:", error.message);
  }
}

async function initConsumer() {
  try {
    await consumer.connect();
    console.log("Kafka Consumer connected");

    await consumer.subscribe({ topic: "message", fromBeginning: true });
    console.log("Subscribed to topic 'message'");

    await consumer.run({
      eachBatch: async ({ batch }) => {
        const messages = batch.messages.map((message) =>
          JSON.parse(message.value.toString())
        );

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
          console.error("Error saving batch to the database:", error.message);
        }
      },
    });
  } catch (error) {
    console.error("Failed to initialize Kafka Consumer:", error.message);
    setTimeout(initConsumer, 5000);
  }
}

initKafka();
initProducer();
initConsumer();

export { KafkaProducer };

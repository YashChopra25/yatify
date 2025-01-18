import express from "express";
import cors from "cors";
import env from "dotenv";
import http from "http";
import DBConfig from "./DBConfig/DBConfig.js";
import cookieParser from "cookie-parser";
import { Server as SocketServer } from "socket.io"; // Correct import for socket.io
import morgan from "morgan"
env.config();
const app = express();
const server = http.createServer(app); // Creating the HTTP server
const PORT = process.env.PORT || 8000;

// CORS Options
const corsOptions = {
  origin: ["http://localhost:3000", process.env.FRONTEND_URL],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "receiver"],
  exposedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
DBConfig(); // Configure database connection

// Set up the Socket.io server
const io = new SocketServer(server, {
  cors: corsOptions,
});

// WebSocket Events
io.on("connection", (socket) => {

  // Handle incoming message event (example)
  socket.on("message", (message) => {
    // Emit message to all connected clients
    io.emit("receive_message", message);
    
    io.emit("refresh_previous_message",message.receiver)
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
  });
});
// Test Route
app.get("/", (req, res) => {
  res.send("Hello yatify!, users are welcome");
});

app.get("/test", (req, res) => {
  res.send({
    message: "Server is up and running, working fine....",
    success: "success",
  });
});

// Authentication routes and middlewares
import HandleAuthRoutes from "./routes/HandleAuthRoutes.js";
import { AuthTokenMiddleware } from "./middlewares/AuthMiddleware.js";
import { AllRouteHandler, ErrorHandler } from "./utils/ErrorHandler.js";

// API routes
app.use("/api/v1/auth/user", HandleAuthRoutes);

import MessageRoutes from "./routes/MessageRoutes.js";
import { messageMiddleware } from "./middlewares/MessageMiddleware.js";
app.use(
  "/api/v1/messages",
  AuthTokenMiddleware,
  messageMiddleware,
  MessageRoutes
);

// Handle 404 and errors
app.use("*", AllRouteHandler); // Handle not found routes
app.use(ErrorHandler); // Handle errors globally

// Start the server
server.listen(PORT, () => {
  console.info("Server started on port " + PORT);
});

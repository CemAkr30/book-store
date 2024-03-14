import express, { response } from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Handle preflight OPTIONS requests
app.options("*", cors());
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/books", booksRoute);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Connection Error:", err.message));

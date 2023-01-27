require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(cookieParser());
app.use("/api", router);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Nothing interesting here");
});

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`--- The server is up on ${PORT} port ---`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();

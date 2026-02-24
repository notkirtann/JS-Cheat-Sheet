import "dotenv/config";
import express from "express";
import connectDB from "./db/connection.js";
import chalk from "chalk";
import cors from "cors";
import jwtAPI from "./routes/index.js";

const app = express();
const PORT =
  process.env.ENV === "prod" ? process.env.PROD_PORT : process.env.DEV_PORT;

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb" }));
app.use(
  cors({
    origin: [process.env.DEV_ORIGIN, process.env.PROD_ORIGIN],
    credentials: true,
  }),
);

app.use("/api", jwtAPI);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.bgGreen.black(`Server  is running on PORT ${PORT} `));
    });
  })
  .catch((error) => {
    console.log(`There is and error connecting PORT`, error);
  })
  .finally(() => {
    console.log(chalk.black.bgWhite.blue(`Both Database  𖥕  PORT connected`));
  });

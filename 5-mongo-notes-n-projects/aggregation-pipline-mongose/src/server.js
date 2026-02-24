import "dotenv/config";
import express from "express";
import connectDB from "./db/connection.js";
import chalk from "chalk";
import shopRoutes from "./routes/shop.js";

const app = express();
const PORT =
  process.env.ENV === "dev" ? process.env.DEV_PORT : process.env.PROD_PORT;

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb" }));

app.use("/api", shopRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.blue(`Server is running on PORT ${PORT}`));
    });
  })
  .catch((error) => {
    console.log(chalk.bgRed(`There is and error connecting PORT`, error));
  })
  .finally(() => {
    console.log(
      chalk.greenBright(`Both Database and PORT connection are succesfull`),
    );
  });

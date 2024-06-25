require("express-async-errors");
require("dotenv/config")

const migrationsRun = require("./database/sqlite/migrations");
const express = require("express");
const cors = require("cors");
const AppError = require("./utils/AppError");
const routes = require("./routes");
const uploadConfig = require("./configs/upload");

migrationsRun();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "internal server error",
  });
});

//listen port
const PORT = process.env.SERVER_PORT || 3333;
app.listen(PORT, () => console.log(`Server ir running on Port ${PORT}`));

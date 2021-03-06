const express = require(`express`);
const createError = require(`http-errors`);
const cors = require("cors");
const helmet = require("helmet");
require(`dotenv`).config();
const app = express();
const { errorHandler } = require("./utils/errorHandler");
var cookieParser = require("cookie-parser");
const logger = require("./config/logger");
const httpLogger = require("./config/httpLogger");


app.use(helmet());
app.use(httpLogger);

app.use(cors({ origin: true, optionsSuccessStatus: 200, credentials: true }));
app.options(
  "*",
  cors({ origin: true, optionsSuccessStatus: 200, credentials: true })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes"));

//Adding Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use(errorHandler);

const PORT =  4000;
const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

module.exports = server;
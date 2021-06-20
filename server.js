const express = require(`express`);
const morgan = require(`morgan`);
const createError = require(`http-errors`);
require(`dotenv`).config();
const app = express();

//Adding Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(morgan(`dev`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/node_modules", express.static("./node_modules"));
app.use(express.static("static"));

app.use("/", require("./index"));

app.use(async (req, res, next) => {
  next(createError.NotFound());
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

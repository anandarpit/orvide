const express = require(`express`);
const morgan = require(`morgan`);
const createError = require(`http-errors`);
const routes = require("./routes/index");
require(`dotenv`).config();

const app = express();

app.use(morgan(`dev`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/node_modules", express.static("./node_modules"));
app.use(express.static("static"));

app.use("/", routes);

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

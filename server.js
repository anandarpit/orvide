const express = require(`express`);
const morgan = require(`morgan`);
const createError = require(`http-errors`);
require(`dotenv`).config();

const app = express();
app.use(morgan(`dev`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes/index')
app.use(`/`, routes);

app.use(express.static('static'));
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

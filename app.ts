import express from "express";
import bodyParser from "body-parser";
import creators from "./api/creators";
import movie from "./api/movie";
import person from "./api/person";
import searchmovie from "./api/searchmovie";
import stars from "./api/stars";

const port = process.env.PORT || 3000;
export const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.text());
app.use(bodyParser.json());

app.use("/movie", movie);
app.use("/person", person);
app.use("/stars", stars);
app.use("/creators", creators);
app.use("/search", searchmovie);

app.listen(port, () => console.log(`Server is running on port ${port}`));
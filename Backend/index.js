const connectToMongo = require("./db");

connectToMongo();

// https://expressjs.com/en/starter/hello-world.html
const express = require("express");
const app = express();
var cors = require("cors");
const port = 5000;

/* This is a middleware function that allows us to use the express.json() function. */
app.use(express.json());
app.use(cors());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Notebook app listening http://localhost:${port}`);
});

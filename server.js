// Dependencies
const express = require("express");
const apiRouter = require("./routes/apiRouter");
const notesRouter = require("./routes/notesRouter");

// Setting up Server
const app = express();
const PORT = process.env.PORT || 3001;

// we parse here incoming string or array data
app.use(express.urlencoded({ extended: true }));
// we parse here incoming JSON data
app.use(express.json());
// Static Middleware
app.use(express.static("public"));
app.use("/api", apiRouter);
app.use("/", notesRouter);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});

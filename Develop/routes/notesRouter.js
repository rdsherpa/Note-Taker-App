const express = require("express");
const notesRouter = express.Router();

notesRouter.get("/notes", (req, res) => {
  // req is request and res is response
  console.log("__dirname", __dirname);
  res.sendFile(path.join(__dirname, "./public/notes.html")); // __dirname is a variable that returns the folder path of current JavaScript
});

module.exports = notesRouter;

// Dependencies
const fs = require("fs");
const path = require("path");
const express = require("express");
const dbJson = require("./db/db.json");
var uuidv1 = require("uuidv1");

// Setting up Server
const PORT = process.env.PORT || 3001;
const app = express();

// we parse here incoming string or array data
app.use(express.urlencoded({ extended: true }));
// we parse here incoming JSON data
app.use(express.json());
// Static Middleware
app.use(express.static("./develop/public"));

app.get("/notes", (req, res) => {
  // req is request and res is response
  console.log("__dirname", __dirname);
  res.sendFile(path.join(__dirname, "./public/notes.html")); // __dirname is a variable that returns the folder path of current JavaScript
});

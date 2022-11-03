// Dependencies
const fs = require("fs");
const path = require("path");
const express = require("express");
const dbJson = require("./db/db.json");
var uuid = require("uuid");

// Setting up Server
const app = express();
const PORT = process.env.PORT || 3001;

// we parse here incoming string or array data
app.use(express.urlencoded({ extended: true }));
// we parse here incoming JSON data
app.use(express.json());
// Static Middleware
app.use(express.static("./public"));
app.use(require("./routes/apiRouter"));
app.use(require("./routes/notesRouter"));

app.get("/notes", (req, res) => {
  // req is request and res is response
  console.log("__dirname", __dirname);
  res.sendFile(path.join(__dirname, "./public/notes.html")); // __dirname is a variable that returns the folder path of current JavaScript
});

app.get("/api/notes", (req, res) => {
  const dataNotes = fs.readFileSync(
    path.join(__dirname, "./db/db.json"),
    "utf-8"
  );
  const parseNotes = JSON.parse(dataNotes);
  res.json(parseNotes);
});

app.post("/api/notes", (req, res) => {
  const dataNotes = fs.readFileSync(
    path.join(__dirname, "./db/db.json"),
    "utf-8"
  );
  const parseNotes = JSON.parse(dataNotes);
  req.body.id = uuid();
  parseNotes.push(req.body);

  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(parseNotes),
    "utf-8"
  );
  res.json("You were successful in creating a note!");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.delete("/app/notes/:id", function (req, res) {
  console.log(uuid());
  console.log("req.params:", req.params);
  let deleteNote = parseInt(req.params.id);
  console.log(deleteNote);

  //creating an array and for loop:
  for (let i = 0; i < dbJson.length; i++) {
    if (deleteNote === dbJson[i].id) {
      dbJson.splice(i, 1);

      let noteJson = JSON.stringify(dbJson, null, 2);
      console.log(noteJson);
      fs.writeFile("./db/db.json", noteJson, function (err) {
        if (err) throw err;
        console.log("Note you created has been deleted");
        res.json(dbJson);
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});

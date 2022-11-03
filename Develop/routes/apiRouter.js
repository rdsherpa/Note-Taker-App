const express = require("express"); // importing express
const apiRouter = require("./notesRouter");

const app = express();
app.use("/", apiRouter);

apiRouter.get("/api/notes", (req, res) => {
  const dataNotes = fs.readFileSync(
    path.join(__dirname, "./db/db.json"),
    "utf-8"
  );
  const parseNotes = JSON.parse(dataNotes);
  res.json(parseNotes);
});

apiRouter.post("/api/notes", (req, res) => {
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

module.exports = apiRouter;

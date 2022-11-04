const express = require("express"); // importing express
const apiRouter = express.Router();
const storage = require("../db/storage");

apiRouter.get("/notes", (req, res) => {
  storage
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

apiRouter.post("/notes", (req, res) => {
  storage
    .addNote()
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

apiRouter.delete("/notes/:id", (req, res) => {
  storage
    .removeNote(req.params.id)
    .then((notes) => {
      res.json({ ok: true });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = apiRouter;

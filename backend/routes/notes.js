const router = require("express").Router();
const Note = require("../models/notes.model");
// get all notes
router.route("/").get((req, res) => {
  Note.find({}, (err, foundNotes) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(foundNotes);
    }
  });
});

// post new note
router.post("/add", (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content,
  });
  newNote.save((err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json("Note added succesfully");
    }
  });
});
// used to delete
router
  .route("/:id")
  .get((req, res) => {
      Note.findById(req.params.id, (err,foundNote) =>{
          if(err){
              res.status(400).json(err);
          } else {
              res.json(foundNote);
          }

      });
  })
  .delete((req, res) => {
      Note.findByIdAndDelete(req.params.id, (err) =>{
          if(err){
              res.status(400).json(err);
          } else {
              res.json("Item deleted succesfuly");
          }
      })
  });
//   update Note 
router.patch("/update/:id", (req,res) =>{
    Note.findByIdAndUpdate(req.params.id,{$set: req.body}, (err) =>{
        if(err){
            res.status(400).json(err);
        } else {
            res.json("updated succesfully");
        }
    });
});

module.exports = router;

const express = require('express');
const router = express.Router()
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1 :  Get all NOtes using : GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes',fetchuser, async(req, res) => {
try {
  
    const notes = await Note.find({user:req.user.id});
    res.json(notes)
} catch (error) {
  console.error(error.message);
    res.status(500).send("Internal Server Error");
}

})

  // ROUTE 2 : Add a new Note using : POST "/api/notes/addnote". Login required
router.post('/addnote',fetchuser, [
  body('description','description must be atleast 5 characters').isLength({min : 5}),
  body('title','Enter a Valid title').isLength({min : 3}),
],async(req, res) => {
  
  try {
    const {title, description, tag } = req.body;

   //If there are errors, return Bad requests and errors 
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   const note = new Note({
    title, description, tag, user: req.user.id
   })
    const savedNote = await note.save()
  res.json(savedNote)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
   
})


// ROUTE 3 :  Update the notes using : PUT "/api/notes/updatenotes". Login required
router.put('/updatenotes/:id',fetchuser, async(req, res) => {
  try {
    const {title, description, tag}  = req.body;

    newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    let note = await Note.findByIdAndUpdate(req.params.id)

      if(!note) {res.status(404).send("Not Found")}
      
      if(req.user.id !== note.user.toString())
      {
        return res.status(404).send("Not Allowed")
      }

      note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {New:true})
      res.json({note})
     
  } catch (error) {
    console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
  
  })


  // ROUTE 4 :  Update the notes using : DELETE "/api/notes/deletenotes". Login required
router.delete('/deletenotes/:id',fetchuser, async(req, res) => {
  try {
    
     // Find the note to be deleted
    let note = await Note.findById(req.params.id)

      if(!note) {res.status(404).send("Not Found")}
      
      // allow deletion only if user owns this note
      if(req.user.id !== note.user.toString())
      {
        return res.status(404).send("Not Allowed")
      }

      note = await Note.findByIdAndDelete(req.params.id)
      res.json({"success": "this note is deleted", note: note})
     
  } catch (error) {
    console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
  
  })

  module.exports = router
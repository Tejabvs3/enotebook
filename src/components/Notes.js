import React,{useContext , useEffect , useRef, useState} from 'react'
import NoteContext from "../context/notes/NoteContext"
import NoteItem from './NoteItem';
import Addnotes from './Addnotes'
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
    const context = useContext(NoteContext);
    const {notes, getNotes, editNote} = context;
    let navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes();
      }
      else{
        navigate("/login");
      }
      
      // eslint-disable-next-line  
    }, [])
    
   const ref = useRef(null);
   const refClose = useRef(null);
   const [note,setNote] = useState({id:"",etitle : "", edescription:"", etag : ""})

    const  updateNote = (currentNote)=>{
        ref.current.click();
        setNote({id: currentNote._id,etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag})
    }

    
    const handleClick = (e)=>{
      console.log("updating the note...",note);
      editNote(note.id,note.etitle,note.edescription,note.etag)
       refClose.current.click();
        props.showAlert("Updated Successfully","success");

   
  }
const onChange = (e)=>{
  setNote({...note, [e.target.name] : e.target.value})
}

  return (
    <>
    <Addnotes showAlert = {props.showAlert}/>
<button type="button" ref = {ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title " id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close mx-4" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" value = {note.etitle} name ="etitle" aria-describedby="emailHelp" 
       onChange = {onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" value = {note.edescription} id="edescription" name = "edescription" onChange = {onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" value = {note.etag} name = "etag" onChange = {onChange}/>
  </div>
  
</form>
      </div>
      <div className="modal-footer">
        <button ref = {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled = {note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className="row">
  <h2> Your Notes</h2>
  <div className="container mx-2">
      {notes.length===0 && "No Notes to Display"}
  </div>
  {notes.map((note)=>{
      return <NoteItem showAlert = {props.showAlert} key = {note._id} updateNote = {updateNote} note = {note}/>
  })}
  </div>
  </>
  )
}

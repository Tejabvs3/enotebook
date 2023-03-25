import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState =(props)=>{
    
  /*  const s1 = {
        "name" : "satish",
        "class" : "3y"
    }
    const [state, setState] = useState(s1);
    const update = ()=>{
        setTimeout(() => {
             setState({
            "name":"Manohar",
            "class": "2y"
        })
        }, 1000);
    }
    
    return(
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
  */

     const host = "http://localhost:5000"
    const notesInitial = [
       /* {
          "_id": "63d9f621bc8cbd581407d36e",
          "user": "63d7fe247d01c8707e01cb4a",
          "title": "updated notes",
          "description": "access this updated notes",
          "tag": "public",
          "date": "2023-02-01T05:18:25.191Z",
          "__v": 0
        },
        {
          "_id": "63da6974ab4f267a14b49714",
          "user": "63d7fe247d01c8707e01cb4a",
          "title": "New Note",
          "description": "Use this notes",
          "tag": "personal",
          "date": "2023-02-01T13:30:28.907Z",
          "__v": 0
        },
        {
          "_id": "63da6974ab4f267a14b49713",
          "user": "63d7fe247d01c8707e01cb4a",
          "title": "New Note",
          "description": "Use this notes",
          "tag": "personal",
          "date": "2023-02-01T13:30:28.907Z",
          "__v": 0
        },
        {
          "_id": "63da6974ab4f267a14b49712",
          "user": "63d7fe247d01c8707e01cb4a",
          "title": "New Note",
          "description": "Use this notes",
          "tag": "personal",
          "date": "2023-02-01T13:30:28.907Z",
          "__v": 0
        },
        {
          "_id": "63da6974ab4f267a14b49711",
          "user": "63d7fe247d01c8707e01cb4a",
          "title": "New Note",
          "description": "Use this notes",
          "tag": "personal",
          "date": "2023-02-01T13:30:28.907Z",
          "__v": 0
        },
        {
          "_id": "63d9f621bc8cbd581407d360",
          "user": "63d7fe247d01c8707e01cb4a",
          "title": "updated notes",
          "description": "access this updated notes",
          "tag": "public",
          "date": "2023-02-01T05:18:25.191Z",
          "__v": 0
        },
        {
          "_id": "63d9f621bc8cbd581407d369",
          "user": "63d7fe247d01c8707e01cb4a",
          "title": "updated notes",
          "description": "access this updated notes",
          "tag": "public",
          "date": "2023-02-01T05:18:25.191Z",
          "__v": 0
        } */
      ]

      const [notes, setNotes] = useState(notesInitial);
      
      // Get all Notes
      const getNotes = async(title, description, tag)=>{
        //API CALL
        const url = `${host}/api/notes/fetchallnotes`;
       const response = await fetch(url, {
         method: 'GET', 
         headers: {
           'Content-Type': 'application/json',
           'auth-token':localStorage.getItem('token')
          },
       });
       const json =  await response.json();
       console.log(json);
       setNotes(json);
     }

     //ADD NOTE
      const addNote = async(title, description, tag)=>{
         //API CALL
         const url = `${host}/api/notes/addnote`;
        const response = await fetch(url, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')

          },
          body: JSON.stringify({title , description , tag}) 
        });
        const json =  await response.json();

        // the below code is for frotend appearence and the above addnotes code is for storing notes in backend
         console.log("notes to be added");
          /* const note = {
            "_id": "63d9f621bc87d369", // this id is set by backen only
            "user": "63d7fe21cb4a", // this user is set by backen only
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-02-01T05:18:25.191Z",
            "__v": 0
          }
          */
         const note = json;
          setNotes(notes.concat(note)) 
      }

    // DELETE NOTE
    //API CALL
    const deleteNote = async(id)=>{
       //API CALL
       const url = `${host}/api/notes/deletenotes/${id}`;
      const response = await fetch(url, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
          },
       
      });
       const json =  response.json();
        console.log(json);

    // Below is for deletion in frontend and above is for deletion in  backend
      console.log("Delete the note with id :" + id)
      const newNote = notes.filter((e)=>{return e._id!==id});
        setNotes(newNote);
        
    }

    //EDIT NOTE
    const editNote = async(id, title, description , tag)=>{
       //API CALL
       const url = `${host}/api/notes/updatenotes/${id}`;
      const response = await fetch(url, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title , description , tag}) 
      });
      const json =  await response.json(); 
      console.log(json);

       let newNotes = JSON.parse(JSON.stringify(notes));
         for (let index = 0; index < newNotes.length; index++) {
           const element = newNotes[index];
            if(element._id === id){
              newNotes[index].title = title;
              newNotes[index].description = description;
              newNotes[index].tag = tag;
              break;
            }
        } 
        setNotes(newNotes);
       
       
    }

    return(
        <NoteContext.Provider value={{notes , deleteNote, addNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
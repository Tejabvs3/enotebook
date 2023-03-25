import React from 'react'
import Notes from './Notes'


//import { Link } from 'react-router-dom'

export default function Home(props) {

  
  return (
    <div>
       <Notes showAlert={props.showAlert }/>
    </div>
  )
}



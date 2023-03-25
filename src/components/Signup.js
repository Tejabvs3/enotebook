import React , {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Signup(props) {

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({name : "", email : "", password : "", Cpassword : ""})

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

    const {name, email , password} = credentials
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/createuser";
        const response = await fetch(url, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name, email: email ,password: password}) 

        });
         const json =  await response.json();
          console.log(json);
          if(json.success){
            // save auth-token and redirect
            localStorage.setItem('token', json.authtoken); // save authtoken
            props.showAlert("Account Created Successfully", "success")
            navigate("/"); //redirect 
            
          }
          else {
           // alert("Invalid Credentials");
           props.showAlert("Invalid Details", "danger")
          }
         
    }

  return (
    
    <div className="container">
        <h4>Create an account</h4>
         <form onSubmit = {handleSubmit}>

         <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="name" className="form-control" name = "name" onChange = {onChange} value = {name}  id="name"/>
  </div>         

  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name = "email" onChange = {onChange} value = {email} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name = "password"  onChange = {onChange} minLength= {5} required value = {password}  id="password"/>
  </div>

  <div className="mb-3">
    <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name = "Cpassword"  onChange = {onChange} minLength= {5} required value = {credentials.Cpassword}  id="Cpassword"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

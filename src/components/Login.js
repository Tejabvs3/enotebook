import React , {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Login  (props)  {

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email : "", password : ""})

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/login";
        const response = await fetch(url, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email , password:credentials.password}) 

        });
         const json =  await response.json();
          console.log(json);
          if(json.success){
            // save auth-token and redirect
            localStorage.setItem('token', json.authtoken); // save authtoken
            props.showAlert("Logged in Successfully", "success")
            navigate("/"); //redirect 
            
          }
          else{
            props.showAlert("Invalid Credentials", "danger")
          }
    }

  return (
    <>
   {/* <div><b>This is Login</b></div>*/}
   <h4>Login to the account</h4>
    <form onSubmit = {handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name = "email" onChange = {onChange} value = {credentials.email} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name = "password" onChange = {onChange} value = {credentials.password}  id="password"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>
  )
}



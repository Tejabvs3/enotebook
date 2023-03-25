const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET =  "tejabvs$";
//create  a user using : POST "/api/auth". NO Login required
/* router.post('/', (req, res) => {
        console.log(req.body);
        const user =  User(req.body);
        user.save();  
        res.send(req.body);
})
*/

   //For imposing conditions on users to enter their names, email etc., we put some conditions
// using validation results . It is as follows..... Get the below code from express validator website
// ROUTE 1 : create  a user using : POST "/api/auth/createuser". NO Login required
 router.post('/createuser',[
  body('email','Enter a valid emailid').isEmail(),
  body('name','enter a valid name').isLength({min : 3}),
  body('password','password must be atleast 5 characters').isLength({min : 5}),
 ], async (req, res) => {
  let success = false;
  //If there are errors, return Bad requests and errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }

//res.send(req.body); // this should be commented if the promise in the below exist i.e then(user => res.json(user));

  // Check wheather the user with this email exists alreadt
  try {
  
  let user = await User.findOne({email:req.body.email});
  if(user){
    return res.status(400).json({success,error: "Sorry a user with this email already exists"})
  }

  const salt =  bcrypt.genSaltSync(10);
  const securePw = await bcrypt.hash(req.body.password, salt);
    // create new user
    user = await User.create({
   email : req.body.email,
    name: req.body.name,
    password: securePw,
    
  })
  //.then(user => res.json(user)).catch(err=> {console.log(err)
    // res.json({error : 'Please Enter a unique EmailId', message : err.message})});
    const data = {
      user : {
        id: user.id 
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    //console.log(authtoken);
    //res.json(user);
    success = true
    res.json({success, authtoken});
      
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }

  })

  //ROUTE 2 :  Authenticate  a user using : POST "/api/auth/login". NO Login required
 router.post('/login',[
  body('email','Enter a valid emailid').isEmail(),
  body('password','Password cannot be blank').exists(),

 ], async (req, res) => {

  let success = false;
    //If there are errors, return Bad requests and errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
    return res.status(400).json({success,error: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({success,error: "Please try to login with correct credentials"});
    }

    const data = {
      user : {
        id: user.id 
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true
    res.json({success, authtoken});

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
 });

 //ROUTE 3 :  Get logged in user details  using : POST "/api/auth/getuser". Login required
 router.post('/getuser', fetchuser , async (req, res) => {
      
 
 try {
    userId = req.user.id ;
     const user = await User.findById(userId).select("-password")
     res.send(user)
 } catch (error) {
   console.error(err.message);
    res.status(500).send("Internal Server Error");
 }

})
module.exports = router
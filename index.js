const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors')


connectToMongo();


const app = express()
const port = 5000

app.use(cors())
app.use(express.json()); // middleware for the body which is in auth.js , header in notes etc.,
//Available Routes 
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


app.listen(port, () => {
  console.log(`eNotebook backend listening on port ${port}`)
})



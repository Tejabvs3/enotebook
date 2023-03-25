const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/?directConnection=true&tls=false&readPreference=primary&appName=MongoDB%25Compass";

// DB - CRUD - create read update delete

/*const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
       
            console.log("Connected to Mongo Succesfully");
        }) 
    }
      */

        const server = '127.0.0.1:27017';
        const database = 'enotebookDB';

        const connectDB = async()=>{
            try {
                await mongoose.connect(`mongodb://${server}/${database}`);
                console.log('MongoDB connected!!');
            } catch (err){
                console.log("Failed to connect to MongoDB",err);
            }
        };
    


 // module.exports = connectToMongo;
 module.exports = connectDB;
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 3000
const dotenv = require('dotenv');
dotenv.config();
const dbUrl = process.env.DATABASE_URL;

app.use(express.json())


const {userRouter} = require("./routes/user")

app.use("/api/v1/user", userRouter)

async function main() {
    try {
      await mongoose.connect(dbUrl);
      console.log('Connected to MongoDB');
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.error('Error connecting to the database', error);
      process.exit(1); 
    }
  }
  
  main()    
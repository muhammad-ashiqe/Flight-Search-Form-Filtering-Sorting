import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
import { connectDB } from "./config/db.js"


const app = express()
configDotenv()
connectDB()

const PORT = process.env.PORT || 7000

app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
  res.send('Api is running!')
})

app.listen(PORT,()=>{
  console.log(`server is running at http://localhost:${PORT}`)
})
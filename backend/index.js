import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
import { connectDB } from "./config/db.js"
import { flightRouter } from "./routes/flightRoutes.js"


const app = express()
configDotenv()

//db connection
connectDB()

const PORT = process.env.PORT || 7000

//middlewares
app.use(express.json())
app.use(cors())

//routes
app.get('/',(req,res)=>{
  res.send('Api is running!')
})

app.use('/api/flight',flightRouter)


app.listen(PORT,()=>{
  console.log(`server is running at http://localhost:${PORT}`)
})
import mongoose from "mongoose"

export const connectDB = async()=>{
  try {
    const db = await mongoose.connect(process.env.MONGO_URI)
    console.log(`DB Connected Success! ,host:${db.connection.host}`)
  } catch (error) {
    console.log(`DB Connection Error , ${error}`)
  }
}

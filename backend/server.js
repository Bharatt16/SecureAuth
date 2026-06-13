import "dotenv/config"
import app from  '../backend/src/app.js'
import connectDB from "./src/common/config/db.js";
import { transporter } from "./src/common/config/email.js";



const PORT = process.env.PORT || 5000;

const start = async() =>{
    await connectDB();
    app.listen(PORT , ()=>{
        console.log(`Server is running on ${PORT}`)
    })
   try {
  await transporter.verify();
  console.log("Email service connected");
} catch (error) {
  console.warn("Email service unavailable");
  console.warn(error.message);
}
}

start().catch((err)=>{
    console.log("Failed to start server",err)
    process.exit(1);
})

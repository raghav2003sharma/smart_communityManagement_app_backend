import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv";
import connect from "./db/dbconnect.js";
import router from "./routes/userAuth.js";
env.config();

connect();//connecting to mongodb server
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));
app.use("/auth",router); 

app.get('/',(req,res)=>{
    res.send("ping pong")
})





app.listen(port ,()=>{
    console.log(`server is listening on port ${port}`);
})

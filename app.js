import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import env from "dotenv";
import connect from "./db/dbconnect.js";
import authRoute from "./routes/userAuth.js";
import billRoute from "./routes/billRoute.js";
import eventRoute from "./routes/eventRoutes.js";
import { authUser } from "./middlewares/authMiddleware.js";

env.config();

connect();//connecting to mongodb server
const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true, // This is the key part for Access-Control-Allow-Credentials
    methods: 'GET,HEAD,OPTIONS,POST,PUT',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
   
}
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));



//routes
app.use("/auth",authRoute); //user authentication routes
//protected routes
app.use("/bill",authUser,billRoute);//bill routes
app.use("/event",authUser,eventRoute);//event routes





app.listen(port ,()=>{
    console.log(`server is listening on port ${port}`);
})

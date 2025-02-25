import mongoose from "mongoose";

function connect(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to MongoDB");
    })
    .catch(error=>{
        console.log(error);
    })
}

export default connect;
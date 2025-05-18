import {Schema,model} from "mongoose";

const eventSchema = new Schema({
        title:{
            type:String,
            required:true
        },
        description:{
            type: String,
            required:true
        },
        dateTime:{
            type:String,
            required:true
        }

})

const Event = model('event',eventSchema);
export default Event;
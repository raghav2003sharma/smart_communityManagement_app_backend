import {Schema , model} from 'mongoose';

const billSchema = new Schema({
    billStatus:{
        type: String,
        required: true,
        enum:["paid","unpaid"],
        default: "unpaid"
    },
    title:{
        type: String,
        required: true
    },  
    amount:{
        type: Number,
        required: true,

    },
    dueDate:{
        type: Date,
        required: true
    },
    displayId:{
        type: String,
        unique: true
    }
},{timestamps:true});

export default model('bill',billSchema);
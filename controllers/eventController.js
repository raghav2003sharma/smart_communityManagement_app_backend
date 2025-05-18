import Event from "../models/eventSchema.js";

const createEvent = async (req, res) => {
    try{
        const {title,description,dateTime} = req.body;
        if (!title || !description || !dateTime) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const newEvent = await Event.create({
            title,
            description,
            dateTime
        });
        res.status(201).json({message:"Event created",data:newEvent,success:true})
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"event creation failed,internal server error",success:false})
    }
}

const findAllEvents = async (req, res) => {
    try{
        const events = await Event.find();
        console.log(events);
        res.status(200).json({message:"All events fetched",data:events,success:true})
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"Failed to fetch events,internal server error",success:false})
    }
}
const findEventById = async (req, res) => {
    try{
        const event = await Event.findById(req.params.id);
        res.status(200).json({message:"Event fetched",data:event,success:true})
    }   catch(err){
        console.log(err.message);
        res.status(500).json({message:"Failed to fetch event,internal server error",success:false})
    }
}
const updateEvent = async (req, res) => {    
    try{
        const updatedEvent= await Event.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({message:"Event updated",data:updatedEvent,success:true})
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({message:"Failed to update event,internal server error",success:false})
    }
}
const deleteEvent = async (req, res) => {
    try{
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"event deleted",data:deletedEvent,success:true})
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({message:"Failed to delete event,internal server error",success:false})
    }
}

export {createEvent,findAllEvents,findEventById,updateEvent,deleteEvent}
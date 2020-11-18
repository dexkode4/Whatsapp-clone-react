import mongoose from 'mongoose';

const whatsappSchema = new mongoose.Schema({
    message: String,
    name: String,
    recieved: Boolean
},{ timestamps: true });


export default mongoose.model('messagecontent', whatsappSchema);
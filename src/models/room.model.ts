import mongoose, { mongo, Schema } from 'mongoose';

const roomSchema = new Schema({
    meessage: String,
    name: String,
    send_at: Date,
    room: String
});

const roomModel = mongoose.model('rooms', roomSchema);
export default roomModel;
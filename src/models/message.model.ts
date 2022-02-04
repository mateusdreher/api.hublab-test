import mongoose, { mongo, Schema } from 'mongoose';

const messageSchema = new Schema({
    message: String,
    name: String,
    send_at: Date,
    room: String
});

const messageModel = mongoose.model('messages', messageSchema);
export default messageModel;
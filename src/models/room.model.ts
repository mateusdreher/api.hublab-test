import mongoose, { mongo, Schema } from 'mongoose';

const roomSchema = new Schema({
    name: String,
});

const roomModel = mongoose.model('rooms', roomSchema);
export default roomModel;
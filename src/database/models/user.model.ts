import mongoose, { mongo, Schema } from 'mongoose';

const userSchema = new Schema({
    email: String,
    password: String,
    name: String
});

export default mongoose.model('UserModel', userSchema);
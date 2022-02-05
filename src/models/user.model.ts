import mongoose, { mongo, Schema } from 'mongoose';

const userSchema = new Schema({
    email: String,
    password: String,
    name: String
});

const userModel = mongoose.model('users', userSchema);
export default userModel;
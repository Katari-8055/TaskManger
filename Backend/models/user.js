import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    createdOn: { type: Date, default: () => new Date() },
})

const User = mongoose.model("User", userSchema);
export default User;

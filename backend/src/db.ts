import mongoose, { model, Schema } from "mongoose";
import dotenv from 'dotenv';


dotenv.config();




try {
    mongoose.connect(process.env.MONGO_URL as string);
} catch (e) {
    console.error("Failed to connect to MongoDB:", e);
}

const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
})

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    title: String,
    content: String,
    link: String,
    tags: [String],
    type: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
})

const LinkSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
})

export const LinkModel = model("Links", LinkSchema);
export const ContentModel = model("Content", ContentSchema);
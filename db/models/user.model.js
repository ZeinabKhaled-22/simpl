// import module
import { model, Schema } from "mongoose";
import { gender, roles } from "../../src/utils/constant/enums.js";

// schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: Object.values(gender)
    },
    role: {
        type: String,
        enum: Object.values(roles),
        default: roles.USER
    }
},
    { timestamps: true }
)
// model
export const User = model("User", userSchema)
// import module
import { model, Schema, Types } from "mongoose";
import { gender, roles, status } from "../../src/utils/constant/enums.js";

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
    // status: {
    //     type: String,
    //     enum: Object.values(status),
    //     default: status.PENDING
    // },
    role: {
        type: String,
        enum: Object.values(roles),
        default: roles.USER
    },
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
},
    { timestamps: true }
)
// model
export const User = model("User", userSchema)
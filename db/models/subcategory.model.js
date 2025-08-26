import { model, Schema } from "mongoose";

// schema
const subCategroySchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true,
        trim: true, // "  hjkkl  "
        lowercase: true, // mobile, Mobile
    },
    slug : {
        type: String,
        required: true,
        unique: true,
        trim: true, 
        lowercase: true,
    },
    image : {
        type: Object
    },
    createdBy : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    categroy : {
        type: Schema.Types.ObjectId,
        ref: "Categroy"
    }
}, {timestamps : true})

// model
export const Subcategroy = model('Subcategroy', subCategroySchema)
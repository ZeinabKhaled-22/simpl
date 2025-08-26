import { model, Schema } from "mongoose";

// schema
const categroySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true, // "  hjkkl  "
        lowercase: true, // mobile, Mobile
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    image: {
        secure_url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true, toJSON: { virtuals: true } })
categroySchema.virtual('subcategroies', {
    ref: "Subcategroy",
    localField: "_id",
    foreignField: "categroy"
})

// model
export const Categroy = model('Categroy', categroySchema)
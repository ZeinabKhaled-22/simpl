import { Schema } from "mongoose";
import { paymentMethod } from "../../src/utils/constant/enums.js";

// schema
const orderSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    government: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowerCase: true,
        unique: true
    },
    orderNotes: String,
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        subtotal: Number,
        shipping: Number,
        total: Number
    },
    payment: {
        type: String,
        enums: Object.values(paymentMethod),
        default: paymentMethod.CASH
    }
}, {timestamps: true})
// model
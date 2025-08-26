import { model, Schema } from "mongoose"
import { discountTypes } from "../../src/utils/constant/enums.js"

// schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        min: 0,
        default: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        min: 0
    },
    discountType: {
        type: String,
        enum: Object.values(discountTypes), //['fixedAmount', 'percentage'],
        default: discountTypes.PERCENTAGE
    },
    colors: [String], //['red', 'green', 'black']
    sizes: [String],
    mainImage: {
        secure_url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    subImages: [
        {
            secure_url: {
                type: String,
                required: true
            },
            public_id: {
                type: String,
                required: true
            }
        }
    ],
    categroy: {
        type: Schema.Types.ObjectId,
        ref: 'Categroy',
        required: true,
    },
    subcategroy: {
        type: Schema.Types.ObjectId,
        ref: 'Subcategroy',
        required: true,
    },
    // brand: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Brand',
    //     required: true,
    // },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rate: {
        type: Number,
        default: 5,
        max: 5,
        min: 1
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
// model
productSchema.methods.inStock = function (quantity) {
    return this.stock < quantity ? false : true
}
productSchema.virtual('finalPrice').get(function () {
    if (this.discountType == discountTypes.FIXED_AMOUNT) {
        return this.price - this.discount
    } else {
        return this.price - (this.price * (this.discount || 0)) / 100
    }
})
export const Prouduct = model('Product', productSchema)
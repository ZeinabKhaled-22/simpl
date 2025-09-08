import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const addProductVal = joi.object({
    name: generalFields.name.required(),
    description: generalFields.description.required(),
    stock: generalFields.stock,
    price: generalFields.price.required(),
    discount: generalFields.discount,
    discountType: generalFields.discountType,
    colors: generalFields.colors,
    sizes: generalFields.sizes,
    categroy: generalFields.objectId.required(),
    subcategroy: generalFields.objectId.required(),
})

export const updateProductVal = joi.object({
    name: generalFields.name,
    description: generalFields.description,
    stock: generalFields.stock,
    price: generalFields.price,
    discount: generalFields.discount,
    discountType: generalFields.discountType,
    colors: generalFields.colors,
    sizes: generalFields.sizes,
    productId: generalFields.objectId
})
// import module
import joi from 'joi'
import { AppError } from '../utils/appError.js'
import { discountTypes } from '../utils/constant/enums.js'

//parseArray
const parseArray = (value, helper) => {
    let data = JSON.parse(value)
    let schema = joi.array().items(joi.string())
    const { error } = schema.validate(data)
    if (error) {
        return helper(error.details)
    }
    return true
}
// validate
export const isValid = (schema) => {
    return (req, res, next) => {
        let data = { ...req.body, ...req.params, ...req.query }
        const { error } = schema.validate(data, { abortEarly: false })
        if (error) {
            let errArr = []
            error.details.forEach((err) => { errArr.push(err.message) })
            return next(new AppError(errArr, 400))
        }
        next()
    }
}

// generalFields
export const generalFields = {
    objectId: joi.string().hex().length(24),
    description: joi.string().max(2000),
    stock: joi.number().positive(),
    price: joi.number().positive(),
    discount: joi.number(),
    discountType: joi.string().valid(...Object.values(discountTypes)),
    colors: joi.custom(parseArray), // joi.array().item(joi.string())
    sizes: joi.custom(parseArray), // joi.array().item(joi.string())
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.string().email(),
    password: joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_]).{8,}$/)),
    birthday: joi.date(),
    gender: joi.string(),
    name: joi.string(),
}
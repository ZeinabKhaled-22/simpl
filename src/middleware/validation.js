// import module
import joi from 'joi'
import { AppError } from '../utils/appError.js'
// validate
export const isValid = (schema) => {
    return (req, res, next) => {
        let data = { ...req.body, ...req.params, ...req.query }
        const { error } = schema.validate(data, { abortEarly: false })
        if(error) {
            let errArr = []
            error.details.forEach((err) => { errArr.push(err.message)})
            return next(new AppError(errArr, 400))
        }
        next()
    }
}

// generalFields
export const generalFields = {
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.string().email(),
    password: joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_]).{8,}$/)),
    birthday: joi.date(),
    gender: joi.string()
}
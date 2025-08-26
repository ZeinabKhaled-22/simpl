// import module
import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

// signupVal
export const signupVal = joi.object({
    firstName: generalFields.firstName.required(),
    lastName: generalFields.lastName.required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    birthday: generalFields.birthday.required(),
    gender: generalFields.gender.required()
})


// loginVal
export const loginVal = joi.object({
    email: generalFields.email,
    password: generalFields.password.required()
})

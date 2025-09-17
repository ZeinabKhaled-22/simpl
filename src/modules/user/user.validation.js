// import module
import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

// edit profile
export const editProfileVal = joi.object({
    userName: generalFields.name,
    firstName: generalFields.firstName,
    lastName: generalFields.lastName,
    email: generalFields.email,
    userId: generalFields.objectId
})
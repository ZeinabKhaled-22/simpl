import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const addSubcategroyVal = joi.object({
    name: generalFields.name.required(),
    categroy: generalFields.objectId.required()
})

export const updateSubcategroyVal = joi.object({
    name: generalFields.name
})
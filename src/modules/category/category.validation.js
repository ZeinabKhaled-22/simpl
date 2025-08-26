import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const addCategroyVal = joi.object({
    name : generalFields.name.required()
})

export const updateCategroyVal = joi.object({
    name: generalFields.name
})
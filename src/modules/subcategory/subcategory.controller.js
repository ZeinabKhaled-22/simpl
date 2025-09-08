import slugify from "slugify"
import { Categroy, Subcategroy } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/message.js"
import cloudinary from "../../utils/cloud.js"

// add subcategroy
export const addSubcategroy = async (req, res, next) => {
    // get data from req
    let { name, categroy } = req.body
    name = name.toLowerCase()
    // check existence
    const categroyExist = await Categroy.findById(categroy)
    if (!categroyExist) {
        return next(new AppError(messages.subcategroy.notFound, 404))
    }
    const subcategroyExist = await Subcategroy.findOne({ name })
    if (subcategroyExist) {
        return next(new AppError(messages.subcategroy.alreadyExist, 409))
    }
    // upload image
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: "simpl/subcategroy/image" })
    req.failImage = { secure_url, public_id }
    // prepare data 
    const slug = slugify(name)
    const subcategroy = new Subcategroy({
        name,
        slug,
        image: { secure_url, public_id },
        categroy,
        createdBy: req.authUser._id
    })
    // add to db
    const createdSubcategroy = await subcategroy.save()
    if (!createdSubcategroy) {
        return next(new AppError(messages.subcategroy.failToCreate, 500))
    }
    // response
    return res.status(201).json({
        message: messages.subcategroy.creadtedSuccessfully,
        success: true,
        data: createdSubcategroy
    })

}

// update subcategroy
export const updateSubcategroy = async (req, res, next) => {
    // get data from req
    let { name } = req.body
    const { subcategroyId } = req.params
    // check existence
    const subcategroyExist = await Subcategroy.findById(subcategroyId)//{}, null
    if (!subcategroyExist) {
        return next(new AppError(messages.subcategroy.notFound, 404))
    }
    // check name
    const nameExist = await Subcategroy.findOne({ name, _id: { $ne: subcategroyId } })//{}, null
    if (nameExist) {
        return next(new AppError(messages.subcategroy.alreadyExist, 409))
    }
    // prepare data
    if (name) {
        name = name.toLowerCase()
        const slug = slugify(name)
        subcategroyExist.name = name
        subcategroyExist.slug = slug
    }
    // update image
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            public_id: subcategroyExist.image.public_id
        })
        subcategroyExist.image = { secure_url, public_id }
        req.failImage = { secure_url, public_id }
    }
    // add to db
    const updatedSubcategroy = await subcategroyExist.save()//{}, null
    if (!updatedSubcategroy) {
        return next(new AppError(messages.subcategroy.failToUpdate, 500))
    }
    // send response
    return res.status(200).json({
        message: messages.subcategroy.updatedSuccessfully,
        success: true,
        data: updatedSubcategroy
    })


}

// get all subcategroies
export const getAllSubategroies = async (req, res, next) => {
    const subcategroies = await Subcategroy.find()
    return res.status(200).json({ success: true, data: subcategroies })
}

// get specific subcategroy
export const specificSubcategroy = async (req, res, next) => {
    // get data from req
    const { subcategroyId } = req.params
    const getSpecific = await Subcategroy.findById(subcategroyId)
    // send response
    return res.status(200).json({ success: true, data: getSpecific })
}

// delete subcategroy
export const deleteSubcategroy = async (req, res, next) => {
    // get data feom req
    const { subcategroyId } = req.params
    // delete
    const deletedSubcategroy = await Subcategroy.deleteOne({ _id: subcategroyId })
    // send response
    return res.status(200).json({ message: messages.subcategroy.deletedSuccessfully, success: true })
}
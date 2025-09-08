import slugify from "slugify"
import { Categroy } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/message.js"
import cloudinary from "../../utils/cloud.js"

// add categroy
export const addCategroy = async (req, res, next) => {
    // get data from req
    let { name } = req.body
    name = name.toLowerCase()
    // check existence
    const categroyExist = await Categroy.findOne({ name })
    if (categroyExist) {
        return next(new AppError(messages.categroy.alreadyExist, 409))
    }
    // upload image
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: "simpl/categroy/image" })
    req.failImage = { secure_url, public_id }
    // prepare data
    const slug = slugify(name)
    const categroy = new Categroy({
        name,
        slug,
        image: { secure_url, public_id },
        createdBy: req.authUser._id
    })
    const createdCategroy = await categroy.save()
    if (!createdCategroy) {
        return next(new AppError(messages.categroy.failToCreate, 500))
    }
    // send response
    return res.status(201).json({
        message: messages.categroy.createdSuccessfully,
        success: true,
        data: createdCategroy
    })
}

// get all categroy
export const getAllCategroies = async (req, res, next) => {
    const categroies = await Categroy.find().populate([{ path: 'subcategroies' }]) // [{}], []
    return res.status(200).json({ success: true, data: categroies })
}

// update categroy
export const updateCategroy = async (req, res, next) => {
    // get data from req
    let { name } = req.body
    const { categroyId } = req.params
    // check existence
    const categroyExist = await Categroy.findById(categroyId)//{}, null
    if (!categroyExist) {
        return next(new AppError(messages.categroy.notFound, 404))
    }
    // check name
    const nameExist = await Categroy.findOne({ name, _id: { $ne: categroyId } })//{}, null
    if (nameExist) {
        return next(new AppError(messages.categroy.alreadyExist, 409))
    }
    // prepare data
    if (name) {
        name = name.toLowerCase()
        const slug = slugify(name)
        categroyExist.name = name
        categroyExist.slug = slug
    }
    // update image
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            public_id: categroyExist.image.public_id
        })
        categroyExist.image = { secure_url, public_id }
        req.failImage = { secure_url, public_id }
    }
    // add to db
    const updatedCategroy = await categroyExist.save()//{}, null
    if (!updatedCategroy) {
        return next(new AppError(messages.categroy.failToUpdate, 500))
    }
    // send response
    return res.status(200).json({
        message: messages.categroy.updatedSuccessfully,
        success: true,
        data: updatedCategroy
    })
}

// delete categroy
export const deleteCategroy = async (req, res, next) => {
    // get data from req
    const { categroyId } = req.params
    // delete categroy
    const deletedCategroy = await Categroy.deleteOne({ _id: categroyId })
    // send response
    return res.status(200).json({
        message: messages.categroy.deletedSuccessfully,
        success: true
    })
}

// get specific categroy
export const specificCatregroy = async (req, res, next) => {
    // get data feom req
    const { categroyId } = req.params
    // get specific
    const getSpecific = await Categroy.findById(categroyId)
    // send response
    return res.status(200).json({ data: getSpecific, success: true })
}

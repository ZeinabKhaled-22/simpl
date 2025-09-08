import slugify from "slugify"
import { Prouduct, Subcategroy } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/message.js"
import cloudinary from "../../utils/cloud.js"
import { ApiFeature } from "../../utils/apiFeature.js"

// add product
export const addProduct = async (req, res, next) => {
    // get data from req
    const {
        name,
        description,
        stock,
        price,
        discount,
        discountType,
        colors,
        sizes,
        categroy,
        subcategroy,
    } = req.body
    // check existence
    // 1- subcategroy exist
    const subcategroyExist = await Subcategroy.findById(subcategroy)// {}, null
    if (!subcategroyExist) {
        return next(new AppError(messages.subcategroy.notFound, 404))
    }
    // upload images >>> {mainImage:[{}], subImages: [{},{},{},{},{}]}
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path, { folder: 'simpl/products/main-image' })
    let mainImage = { secure_url, public_id }
    req.failImages = []
    req.failImages.push(public_id)
    let subImages = []
    for (const file of req.files.subImages) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { folder: 'simpl/products/sub-images' })
        subImages.push({ secure_url, public_id })
        req.failImages.push(public_id)
    }
    // prepare data
    const slug = slugify(name)
    const product = new Prouduct({
        name,
        slug,
        description,
        stock,
        price,
        discount,
        discountType,
        colors: JSON.parse(colors),
        sizes: JSON.parse(sizes),
        categroy,
        subcategroy,
        mainImage,
        subImages,
        createdBy: req.authUser._id,
        updatedBy: req.authUser._id
    })
    // add to db
    const createdProduct = await product.save()
    if (!createdProduct) {
        // rollback
        return next(new AppError(messages.product.failToCreate, 500))
    }
    // send response
    return res.status(201).json({
        message: messages.product.creadtedSuccessfully,
        success: true,
        data: createdProduct
    })

}

// get all prouduct
export const getAllProducts = async (req, res, next) => {
    const apiFeature = new ApiFeature(Prouduct.find(), req.query).pagination().sort().select().filter()
    const products = await apiFeature.mongooseQuery
    return res.status(200).json({ success: true, data: products })
}

// update product
export const updateProduct = async (req, res, next) => {
    // get data from req
    let { name, description, stock, price, discount, discountType, colors, sizes } = req.body
    const { productId } = req.params
    // check existense
    const productExist = await Prouduct.findById(productId)//{}, null
    if (!productExist) {
        return next(new AppError(messages.product.notFound, 404))
    }
    // check name existence
    const nameExist = await Prouduct.findOne({ name })//{}, null
    if (nameExist) {
        return next(new AppError(messages.product.alreadyExist, 409))
    }
    // prepare data
    if (name) {
        name = name.toLowerCase()
        const slug = slugify(name)
        productExist.name = name
        productExist.slug = slug
    }
    if (description) {
        productExist.description = description
    }
    if (stock) {
        productExist.stock = stock
    }
    if (price) {
        productExist.price = price
    }
    if (discount) {
        productExist.discount = discount
    }
    if (discountType) {
        productExist.discountType = discountType
    }
    if (colors) {
        productExist.colors = colors
    }
    if (sizes) {
        productExist.sizes = sizes
    }
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            public_id: productExist.mainImage.public_id
        })
        productExist.mainImage = { secure_url, public_id }
        req.failImages = { secure_url, public_id }
    }
    if (req.files?.subImages?.length) {
        const subImages = [];
        for (const file of req.files.subImages) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
                folder: 'simpl/products/sub-images'
            });
            subImages.push({ secure_url, public_id });
        }
        productExist.subImages = subImages;
    }
    // add to db
    const updatedProduct = await productExist.save()//{}, null
    if (!updatedProduct) {
        return next(new AppError(messages.product.failToUpdate, 500))
    }
    // send response
    return res.status(200).json({
        message: messages.product.updatedSuccessfully,
        success: true,
        data: updatedProduct
    })
}

// get specific product
export const specificProduct = async (req, res, next) => {
    // get data from req
    const { productId } = req.params
    const getSpecific = await Prouduct.findById(productId)
    return res.status(200).json({ success: true, data: getSpecific })
}

// delete product
export const deleteProduct = async (req, res, next) => {
    // get data from req
    const { productId } = req.params
    const deletedProduct = await Prouduct.deleteOne({ _id: productId })
    return res.status(200).json({ message: messages.product.deletedSuccessfully, success: true })
}
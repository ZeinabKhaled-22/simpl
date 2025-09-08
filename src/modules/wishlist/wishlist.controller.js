// import modules
import { User } from "../../../db/index.js"
import { messages } from "../../utils/constant/message.js"

// add to wishlist
export const addToWishlist = async (req, res, next) => {
    // get data from params
    const { productId } = req.params
    const userId = req.authUser._id
    // add to db
    const userUpdated = await User.findByIdAndUpdate(userId, { $addToSet: { wishlist: productId } }, { new: true })
    // send response
    return res.status(200).json({
        message: messages.wishlist.updatedSuccessfully,
        success: true,
        data: userUpdated.wishlist
    })
}



// get all wishlists
export const getAllWishlist = async (req, res, next) => {
    // get all
    const allWishlist = await User.find()
    // send response
    return res.status(200).json({
        success: true,
        data: allWishlist
    })
}



// delete wishlist
export const deleteWishlist = async (req, res, next) => {
    // get data from params
    const { productId } = req.params
    const userId = req.authUser._id
    // delete
    const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { wishlist: productId } }, { new: true });
    // send response
    return res.status(200).json({ message: messages.wishlist.deletedSuccessfully, success: true })
}


// get specific wishlist
export const specificWishlist = async (req, res, next) => {
    // get data feom req
    const { productId } = req.params
    // get specific
    const getSpecific = await User.findOne({ wishlist: productId })
    // send response
    return res.status(200).json({ data: getSpecific, success: true })
}
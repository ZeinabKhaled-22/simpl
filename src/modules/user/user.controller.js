// import modules
import { User } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import cloudinary from "../../utils/cloud.js"
import { messages } from "../../utils/constant/message.js"

// edit profile
export const editProfile = async (req, res, next) => {
    // get data from req
    const { userName, firstName, lastName, email } = req.body
    const { userId } = req.params
    // check existence
    const userExist = await User.findById(userId) //{}, null
    if (!userExist) {
        return next(new AppError(messages.user.notFound, 404))
    }
    // edit username
    if (userName) {
        userExist.userName = userName
    }
    // edit first name
    if (firstName) {
        userExist.firstName = firstName
    }
    // edit last name
    if (lastName) {
        userExist.lastName = lastName
    }
    // edit email
    if (email) {
        userExist.email = email
    }
    // edit image
     if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            public_id: userExist.image?.public_id
        })
        userExist.image = { secure_url, public_id }
        req.failImage = { secure_url, public_id }
    }
    // save in db
    const updatedProfile = await userExist.save() //{}, null
    if(!updatedProfile){
        return next(new AppError(messages.user.failToUpdate, 500))
    }
    // send response
    return res.status(200).json({
        message: messages.user.updatedSuccessfully,
        success: true,
        data: updatedProfile
    })

}
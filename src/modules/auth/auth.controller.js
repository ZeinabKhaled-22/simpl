// import module
import bcrypt from 'bcrypt'
import { User } from "../../../db/index.js"
import { messages } from "../../utils/constant/message.js"
import { sendEmail } from "../../utils/email.js"
import { generateOTP } from "../../utils/otp.js"
import { generateToken, verifyToken } from "../../utils/token.js"
import { AppError } from '../../utils/appError.js'
import { status } from '../../utils/constant/enums.js'


// signup
export const signup = async (req, res, next) => {
    // get data from req
    let { firstName, lastName, email, password, birthday, gender } = req.body
    // check existence
    const userExist = await User.findOne({ email }) //{}, null
    if (userExist) {
        return next(new AppError(messages.user.alreadyExist, 409))
    }
    // hash password
    password = bcrypt.hashSync(password, 8)
    // prepare data
    const user = new User({
        firstName,
        lastName,
        email,
        password,
        birthday,
        gender,
        role
    })
    // add to db
    const createdUser = await user.save() //{}, null
    if (!createdUser) {
        return next(new AppError(messages.user.failToCreate, 500))
    }
    // generate token
    const token = generateToken({ payload: email, _id: createdUser._id })
    // send response
    return res.status(201).json({
        message: messages.user.creadtedSuccessfully,
        success: true,
        data: createdUser
    })
}



// verify email
// export const verifyAccount = async (req, res, next) => {
//     // get data from req
//     const { token } = req.params
//     // verify token
//     const payload = verifyToken({ token })
//     // update user
//     const user = await User.findOneAndUpdate({ email: payload, status: status.PENDING }, { status: status.VERIFIED })
//     // send response
//     return res.status(200).json({ message: messages.user.verified, success: true })
// }



// login
export const login = async (req, res, next) => {
    // get data from req
    const { email, password } = req.body
    // check existence
    const userExist = await User.findOne({ email }) //{}, null
    if (!userExist) {
        return next(new AppError(messages.user.invalidCredentials, 400))
    }
    // compare password
    const match = bcrypt.compareSync(password, userExist.password)
    if (!match) {
        return next(new AppError(messages.user.invalidCredentials, 400))
    }
    // generate token
    const token = generateToken({ payload: { _id: userExist._id, email } })
    // send response
    return res.status(200).json({
        message: "login successfully",
        success: true,
        token
    })
}
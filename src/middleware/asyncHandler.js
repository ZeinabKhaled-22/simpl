// import module
import { AppError } from "../utils/appError.js"


// asyncHandler 
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => { next(new AppError(err.message, err.statusCode)) })
    }
}


// globalErrorHandling
export const globalErrorHandling = async (err, req, res, next) => {
    return res.status(err.statusCode || 500).json({ message: err.message, success: false })
}
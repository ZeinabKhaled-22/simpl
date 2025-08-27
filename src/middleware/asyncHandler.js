// import module
import { AppError } from "../utils/appError.js"
import { deleteCloudImage } from "../utils/cloud.js"
import { deleteFile } from "../utils/file.js"


// asyncHandler 
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => { next(new AppError(err.message, err.statusCode)) })
    }
}


// globalErrorHandling
export const globalErrorHandling = async (err, req, res, next) => {
    // rollback
    if(req.file){
        deleteFile(req.file.path)
    }
    // rollback cloud
    if(req.failImage){
        await deleteCloudImage(req.failImage.public_id)
    }
    return res.status(err.statusCode || 500).json({ message: err.message, success: false })
}
import { Router } from "express";
import { fileUploads } from "../../utils/multer.js";
import { isValid } from "../../middleware/validation.js";
import { addCategroyVal, updateCategroyVal } from "./category.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addCategroy, deleteCategroy, getAllCategroies, specificCatregroy, updateCategroy } from "./category.controller.js"
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";
import { cloudUploads } from "../../utils/multer_cloud.js";

const categroyRouter = Router()

// add categroy >> authentication(login) authorization(who is allowed)
categroyRouter.post('/addcategroy',
    isAuthenticated(),
    //isAuthorized([roles.ADMIN]),
    cloudUploads({ folder: "categroy" }).single('image'),
    isValid(addCategroyVal),
    asyncHandler(addCategroy)
)

// get categroy
categroyRouter.get('/getcategroies', asyncHandler(getAllCategroies))

// update categroy
categroyRouter.put('/:categroyId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    cloudUploads({}).single('image'),
    isValid(updateCategroyVal),
    asyncHandler(updateCategroy)
)

// delete categroy
categroyRouter.delete('/:categroyId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    asyncHandler(deleteCategroy)
)

// get specific categroy
categroyRouter.get('/:categroyId', asyncHandler(specificCatregroy))

export default categroyRouter
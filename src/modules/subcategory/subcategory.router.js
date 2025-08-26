import { Router } from "express"
import { fileUploads } from "../..//utils/multer.js"
import { isValid } from "../../middleware/validation.js"
import { addSubcategroyVal, updateSubcategroyVal } from "./subcategory.validation.js"
import { asyncHandler } from "../../middleware/asyncHandler.js"
import { addSubcategroy, deleteSubcategroy, getAllSubategroies, specificSubcategroy, updateSubcategroy } from "./subcategory.controller.js"
import { isAuthenticated } from "../../middleware/authentication.js"
import { isAuthorized } from "../../middleware/authorization.js"
import { roles } from "../../utils/constant/enums.js"

const subcategroyRouter = Router()

// add subcategroy >> authentication authorization
subcategroyRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.ADMIN, roles.SELLER]),
    fileUploads({ folder: "subcategroy" }).single('image'),
    isValid(addSubcategroyVal),
    asyncHandler(addSubcategroy)

)

// update subcategroy 
subcategroyRouter.put('/:subcategroyId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN, roles.SELLER]),
    isValid(updateSubcategroyVal),
    asyncHandler(updateSubcategroy)
)

// get all subcategroies
subcategroyRouter.get('/', asyncHandler(getAllSubategroies))

// get specific subcategroy
subcategroyRouter.get('/:subcategroyId', asyncHandler(specificSubcategroy))

// delete subcategroy
subcategroyRouter.delete('/:subcategroyId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN, roles.SELLER]),
    asyncHandler(deleteSubcategroy)
)

export default subcategroyRouter
//import module
import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";
import { isValid } from "../../middleware/validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { editProfileVal } from "./user.validation.js";
import { cloudUploads } from "../../utils/multer_cloud.js";
import { editProfile } from "./user.controller.js";

// router
const userRoter = Router()

// edit profile
userRoter.put('/:userId',
    isAuthenticated(),
    isAuthorized([roles.USER]),
    cloudUploads({ folder: 'profile' }).single('image'),
    isValid(editProfileVal),
    asyncHandler(editProfile)
)

// export
export default userRoter
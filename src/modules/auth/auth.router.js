// import module
import { Router } from "express"
import { isValid } from "../../middleware/validation.js"
import { asyncHandler } from "../../middleware/asyncHandler.js"
import { loginVal, signupVal } from "./auth.validation.js"
import { adminLogin, login, signup } from "./auth.controller.js"


// router
const authRouter = Router()

// signup
authRouter.post("/signup", isValid(signupVal),asyncHandler(signup))

// get verify
// authRouter.get("/verify/:token", asyncHandler(verifyAccount))

// login
authRouter.post("/login", isValid(loginVal), asyncHandler(login))

// login admin
authRouter.post("/adminLogin", isValid(loginVal), asyncHandler(adminLogin))


// export
export default authRouter
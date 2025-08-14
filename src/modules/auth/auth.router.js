// import module
import { Router } from "express"
import { isValid } from "../../middleware/validation.js"
import { asyncHandeler } from "../../middleware/asyncHandler.js"
import { loginVal, signupVal } from "./auth.validation.js"
import { login, signup } from "./auth.controller.js"


// router
const authRouter = Router()

// signup
authRouter.post("/signup", isValid(signupVal),asyncHandeler(signup))

// login
authRouter.post("/login", isValid(loginVal), asyncHandeler(login))


// export
export default authRouter
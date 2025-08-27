// import module
import cors from 'cors'
import { globalErrorHandling } from "./middleware/asyncHandler.js"
import { authRouter, categroyRouter, productRouter, subcategroyRouter,  } from "./modules/index.js"

// bootStrap
export const bootStrap = (app, express) => {
    // parse data
    app.use(express.json())
    app.use('/uploads', express.static('uploads'))

    // cors
    app.use(cors("*"))

    // routing
    app.use("/auth", authRouter)
    app.use('/product', productRouter)
    app.use('/category', categroyRouter)
    app.use('/subcategory', subcategroyRouter)

    // globalErrorHandling
    app.use(globalErrorHandling)

    // vercel
    app.all("/", (req, res, next) => {
        return res.json({ message: "invalid url" })
    })


}
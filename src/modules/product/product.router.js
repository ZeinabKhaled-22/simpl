import { Router } from "express";
import { cloudUploads } from "../../utils/multer_cloud.js";
import { isValid } from "../../middleware/validation.js";
import { addProductVal, updateProductVal } from "./product.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addProduct, deleteProduct, getAllProducts, specificProduct, updateProduct } from "./product.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../..//utils/constant/enums.js";

const productRouter = Router()

// add product >>> authentication authorization
productRouter.post('/addproduct',
    isAuthenticated(),
    //  isAuthorized([roles.ADMIN, roles.SELLER]),
    cloudUploads({}).fields([{ name: 'mainImage', maxCount: 1 }, { name: 'subImages', maxCount: 5 }]),
    isValid(addProductVal),
    asyncHandler(addProduct)
)

// get all products
productRouter.get('/', asyncHandler(getAllProducts))

// update product
productRouter.put('/:productId',
    isAuthenticated(),
    // isAuthorized([roles.ADMIN, roles.SELLER]),
    cloudUploads({}).fields([{ name: 'mainImage', maxCount: 1 }, { name: 'subImages', maxCount: 5 }]),
    isValid(updateProductVal),
    asyncHandler(updateProduct)
)

// get specific product
productRouter.get('/:productId', asyncHandler(specificProduct))

// delete product
productRouter.delete('/:productId',
    isAuthenticated(),
    // isAuthorized([roles.ADMIN, roles.SELLER]),
    asyncHandler(deleteProduct)
)


export default productRouter
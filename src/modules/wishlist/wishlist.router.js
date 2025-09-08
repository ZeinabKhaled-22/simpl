// import module
import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addToWishlist, deleteWishlist, getAllWishlist, specificWishlist } from "./wishlist.controller.js";

// Router
const wishlistRouter = Router()

// add to wishlist
wishlistRouter.post('/:productId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    asyncHandler(addToWishlist)
)


// get all wishlist
wishlistRouter.get('/',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    asyncHandler(getAllWishlist)
)


// delete wishlist
wishlistRouter.delete('/:productId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    asyncHandler(deleteWishlist)
)



// get specific
wishlistRouter.get('/:productId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    asyncHandler(specificWishlist)
)


// export
export default wishlistRouter

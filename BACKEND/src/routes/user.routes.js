import { Router } from "express"
import {registerUser , loginUser ,getApiResponse, getStockApiResponse, getUserPosts} from "../controllers/user.controller.js"
import  {upload} from '../middlewares/multer.middleware.js'
// import loginUser from "../controllers/user.controller.js"
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { createPost,getPost } from "../controllers/post.controller.js"

const router = Router()

router.route("/signup").post(
    upload.fields([
        {
            name: "avatar",
            maxCount : 1
        },
        {
            name: "coverImage",
            maxCount : 1
        }
    ]),
    registerUser
) 

router.route("/login").post(loginUser)
//toh idher jasie hi / signup page khula ye registerrouter start ho jayega
//llly
//router.route("/login").post(loginUser)


//file handiling ke liye routes pe aane ke baad 
// router.route("/").post(verifyJWT)
router.route("/news").get(getApiResponse)
router.route("/stocks").get(getStockApiResponse)


router.route("/uploadPost").post(
    verifyJWT,
    upload.single("postFile"),
    createPost
)   //*********************************************************************************************************



router.route("/home").get(
    verifyJWT,
    getPost
)

router.route("/profile").get(verifyJWT,getUserPosts)

// router.route("/logout").post(verifyJWT,logoutUser)

//yaha pe verifyJWT is a middle ware which is used here
export default router
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'   //this import is done to through error wheneever necessary
import { Post } from '../models/post.model.js'
import axios from 'axios';
import uploadOnCloudinary from '../utils/cloudinary.js'
import ApiResponse from '../utils/ApiResponse.js'   //this is done to get the response ehich is the last part here
import { User } from '../models/user.model.js';
// import verifyJWT from './middlewares/auth.middleware.js'


const createPost = asyncHandler(async(req,res)=>{

    //get all the required fields, such as heading, message \
    const {title , description } = req.body;

    //check if atleast one thing is present 
    // if(!(title && description)){
    //     throw new ApiError(400,"Title is required");
    // }

    //check if we get image from the frontend
    const postFileLocalPath = req.file?.path;    //**************very impppp ****file*** */
    console.log(postFileLocalPath);

    //if image is found upload it to cloundinary
    const postFile =  await uploadOnCloudinary(postFileLocalPath);
    console.log(postFile);

    // create post table
    const post = await Post.create({
        postFile: postFile?.url || "",
        title,
        description,
        owner: req.user._id
        // User (how to save the id of the current user),
    })

    //get the current post
    const createdPost = await Post.findById(post._id).populate('owner');

    //check if the post is created in the db
    if(!createdPost){
        throw new ApiError(400, "Post not uploaded");
    }

    // save all the details to the post table
    // chekc to to save the current user to the post 

    return res.status(201).json(
        new ApiResponse(200,createdPost, "Post added succesfully")
     )

})



const getPost = asyncHandler(async(req,res) => {                                //yaha pe ye .sort jo hai wo data ko jo last mai submit hua wo pehle dikahyega
    const posts = await Post.find({}).populate('owner','username email').sort({ updatedAt: - 1}); //ye jo hai na populate wala , ye apne ki owner ka "username email" hi dega kyu ki hamne wahi bass manga hai
    console.log(posts);

    if (!posts) { throw new ApiError(400, "No posts found"); }
    return res.status(200).json(new ApiResponse(200, posts, "Posts fetched successfully"));

})

export {
    createPost,
    getPost
}
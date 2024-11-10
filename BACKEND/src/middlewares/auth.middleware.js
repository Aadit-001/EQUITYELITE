//ye middle ware use hua hai to logout user
// uske liye user ka token delete karna hoga
// lekin uska access kaha se milega?
// wo idher se milega


//ye use karne se req.user milta hai , matlab current user milta hai , phir iske sath kuch bhi kar sakte ahi



import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const x = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzJjY2ZmZWYzZTgyNDNjY2ZhNzhiZjMiLCJlbWFpbCI6Im1ha2V5b3V0aGluazAxQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTWFrZVlvdVRoaW5rIiwiaWF0IjoxNzMxMjMwNzQyLCJleHAiOjE3MzEzMTcxNDJ9.3umRKfOzOoyfqRrI5R5gOBF4rorhmuAKb0o8-PY2auw';
    const token = req.cookies?.accessToken ? req.cookies?.accessToken: x ;
    console.log("Token received:", token); // Log the token received

    if (!token) {
      console.log("No token found");
      throw new ApiError(401, "Unauthorized Login");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decodedToken); // Log the decoded token

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    console.log("User found:", user); // Log the user found

    if (!user) {
      console.log("No user found with this token");
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in verifyJWT middleware:", error); // Detailed logging
    throw new ApiError(401, "Invalid access token");
  }
});

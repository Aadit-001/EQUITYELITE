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
    console.log("Full Request Headers:", JSON.stringify(req.headers, null, 2));
    console.log("Full Cookies:", JSON.stringify(req.cookies, null, 2));
    console.log("Authorization Header:", req.headers.authorization);

    // Try multiple ways of getting the token
    const cookieToken = req.cookies?.accessToken;
    const headerToken = req.headers.authorization?.split(' ')[1];
    const localStorageToken = req.headers['x-access-token'];

    const token = cookieToken || headerToken || localStorageToken;

    console.log("Token Sources:", {
      cookieToken: !!cookieToken,
      headerToken: !!headerToken,
      localStorageToken: !!localStorageToken
    });

    if (!token) {
      console.log("No token found through any method");
      throw new ApiError(401, "No access token provided");
    }

    console.log("Token received:", token);

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decodedToken);

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
    if (!user) {
      console.log("No user found with this token");
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Detailed Verification Error:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    if (error.name === 'JsonWebTokenError') {
      throw new ApiError(401, "Invalid JWT Token");
    } else if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, "Access Token Expired");
    }
    
    throw new ApiError(401, error.message || "Authentication Failed");
  }
});

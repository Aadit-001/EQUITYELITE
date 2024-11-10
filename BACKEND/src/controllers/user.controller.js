import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'   //this import is done to through error wheneever necessary
import { User } from '../models/user.model.js'
import axios from 'axios';
// import uploadOnCloudinary from '../utils/cloudinary.js'
import ApiResponse from '../utils/ApiResponse.js'   //this is done to get the response ehich is the last part here
// import verifyJWT from './middlewares/auth.middleware.js'

//ye method is used to generate the access and refresh token
const generateAccessTokenAndRefreshTokens = async(userId) => {
   try {
      const user = await User.findById(userId)  //pehle user ko find kiya and usko call kiya and uske sare details laye db se then usme access and refresh token generate karenge
      console.log(user)
      const accessToken = user.generateAccessToken()
      console.log(accessToken)  //refresh token jo hmane .env mai likha tha wahi abb user ke pass jayega db mai
      const refreshToken = user.generateRefreshToken() // same yaha bhi
      console.log(refreshToken)

      //abb apne pass refresh token and access token banke ready hai toh abb usko db mai dalne ka waqt hai
      user.refreshToken = refreshToken // iska matlab , user ke ko refreshToken ka property jo pehle empty tha abb wo abhi jo generate hua hau usse change kar diya gaya hai
      await user.save({validateBeforeSave : false}) // isse hoga yr ki ham databse mai user ke iss token ko save kar denge and save hote time hamene password : as a required part dala hai lekin yaha pe toh pass nhi hai isliye hum wo extra chiz likh rahe hai

      return {accessToken , refreshToken}

   } catch (error) {
      throw new ApiError(500,"something went wrong while generating access and refresh token")
   }
}

const registerUser = asyncHandler(async (req,res) => {
     //steps to register a user are

     // get user details form the frontend
     const { email, username, password } = req.body //.body se form data mil jata hai url ke liye alag hota hai
     console.log(email);
     console.log(password);


     // validate all fields - not empty
     if(
        [email, username, password].some((field) =>   //some is used to check all the elements of the array
        field?.trim() === "")
     ){
        throw new ApiError(400, "All fields are required")
     }
     
     
     //check if the user already exists: by checking the username or email                   //file handling ke liye jao routes pe 
     const existedUser = await User.findOne({    //findone will find the user in the databse with the user name or the email
        $or: [{email},{username}] //or operator is used to check if either the username is present or the email is present in the database
     })

     if(existedUser){ //if any of the two is present then the ApiError will throught the error 
        throw new ApiError(409, "User Exists");
     }

     
     //check for images , check for req images 
   //   const avatarLocalPath = req.files?.avatar[0]?.path;     //local storage path of the avatar
    //  const coverImageLocalPath = req.files?.coverImage[0]?.path;

   //  let coverImageLocalPath;
   //  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
   //      coverImageLocalPath = req.files.coverImage[0].path
   //  }
     //since avatar was needed if we dont hava a path for the avatar means there is no avatar
     //so throw an error
   //   if(!avatarLocalPath){
   //      throw new ApiError(400, "Avatar is needed")
   //   }
     
     
     // upload them to cloudinary
   //   const avatar = await uploadOnCloudinary(avatarLocalPath)  //this is used to upload to cloudinary
   //   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   //   if(!avatar){
   //      throw new ApiError(400, "Avatar is required")
   //   }


     // create user object - create entry in db
     const user = await User.create({
      //   avatar: avatar.url,
      //   coverImage: coverImage?.url || "",
        email,
        username : username.toLowerCase(),
        password
     })



     // remove password and refresh token feild from response
     const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
     )


     // check for user creation
     if(!createdUser){    //to check if the user is created in the databse or not
        throw new ApiError(400, "There is a user error")
     }



     // return res   
     return res.status(201).json(
        new ApiResponse(200,createdUser, "User registered success")
     )

})

const loginUser = asyncHandler(async(req,res) => {
   //get user deatils form the frontend
   const {email,password} = req.body;

   //validate ki user and password hai ki nhi
   if(!(email || password)){
      throw new ApiError(400,"Details are needed");
   }

   //find the paassword from the database for the username
   const user = await User.findOne({email});
   console.log(user.password)
   console.log(user.username)

   //validate if the pawword is correct or not
   const isPasswordValid = await user.isPasswordCorrect(password)

   if(!isPasswordValid){
      throw new ApiError(401,"fail")
   }

    //destructure
   const {accessToken, refreshToken} = await generateAccessTokenAndRefreshTokens(user._id)

   
   //dekho abhi jo hai na abhi apne pass uppdated user ka data nhi hai kyu ki wo piche kiya gaya yhe toh abb updated data ke liye db ko wapis call karenge , lekin agar ye expensive hua toh nhi karenhge warna kar denge
   const loggedInUser = await User.findById(user._id)
   .select("-password -refreshToken")  //hamne ye use kiya hai taki hum ye dono chize frontend ko na bhheje
   
   //abb hame , access token bhejne ke liye hame cookie bhejna padta haui uske liye ye karna hai
   const options = {
      httpOnly : true,    //ye code likhne se frontend pe cookie modify nhi hoga ,warna koi bhi isko yse kar sakta hau
      secure : false, // Change to true if using HTTPS (for production) and false for development 
      sameSite: 'strict', // ye strict kiya tabhi hi cookies dikha apne console mai ******************************** ye karne se browser ka cookies refresh karne pe bhi hatt nhi raha 
      path: '/'       // applicable for hole site
   }



   //ye kiya tabhi hi hum user ko bhej sake frontend ke pass then then usne phir sare chize user ki access ki db se jo bhi hamene frontend pe bheja hai
   return res
   .status(200)
   .cookie("accessToken",accessToken,options)   //ye bass cookie mai store hua hai isme , 2 line baad wo send bhi hoga frontend ko
   .cookie("refreshToken",refreshToken,options)  
   .json(
      new ApiResponse(200,loggedInUser,{
         isLoggedIn : true,
         accesstoken: accessToken,  //yaha pe ye frontend ko send hua hai, abb frontend apne documnet.cookie make ye dono tokens ko store kar lenge after login
         refreshtoken: refreshToken
      },"success")
   )

})

//********************************************************************************* */

// import session from 'express-session'
// import passport from 'passport'

//********************************************************************************* */
// const logoutUser = asyncHandler(async(req,res) => {
// //    req.logout(function(){
// //       // if(err){return next(err)}
// //       res.redirect("http://localhost:3001/login");
// //   })

//    await User.findByIdAndUpdate(
//       req.user._id,
//       {
//          $set:{
//             refreshToken: null
//          }
//       },
//       {
//          new: true
//       }
//    )

//    const options ={
//       httpOnly:true,
//       secure: false, // Change to true if using HTTPS
//       sameSite: 'strict', // Required for cross-site cookies
//       path: '/'
//    }

//    return res
//    .status(200)
//    .clearCookie("accessToken", options)
//    .clearCookie("refreshToken" , options)
//    .json(
//       new ApiResponse(200, {isLoggedOut : true} , "User logged out")
//    )

// })


//ye news ka part isliye nhi ho raha tha kyu ki axios install tha hi nhi
const getApiResponse = asyncHandler(async(req,res) => {
   try {
      console.log("Started");
      const response = await axios.get(
        "https://finnhub.io/api/v1/news?category=general&token=crvqbdhr01qkji45o89gcrvqbdhr01qkji45o8a0"
      );
      console.log(response.data)
      return res.json(response.data); // Send the news data back to the frontend
    } catch (error) {
      return res.status(500).json({ message: "Error fetching news" });
    }
})


//api stocks
// const getStockApiResponse = asyncHandler(async(req,res) => {
//    try {
//       console.log("Started");
//       const response = await axios.get(
//         "   "
//       );
//       console.log(response.data)
//       return res.json(response.data); // Send the news data back to the frontend
//     } catch (error) {
//       return res.status(500).json({ message: "Error fetching stocks" });
//     }
// })




















// import asyncHandler from '../utils/asyncHandler.js';
// import ApiError from '../utils/ApiError.js';
// import axios from 'axios';
// import ApiResponse from '../utils/ApiResponse.js';

// const FINNHUB_API_TOKEN = 'csnj8upr01qqapaib3d0csnj8upr01qqapaib3dg';
// const STOCK_SYMBOLS = ['AAPL', 'NVDA', 'MSFT', 'GOOGL'];

// const getStockApiResponse = asyncHandler(async (req, res) => {
//   try {
//     const stockDataPromises = STOCK_SYMBOLS.map(async (symbol) => {
//       const profileResponse = await axios.get(
//         `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_TOKEN}`
//       );
//       const metricResponse = await axios.get(
//         `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${FINNHUB_API_TOKEN}`
//       );
//       const quoteResponse = await axios.get(
//         `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_TOKEN}`
//       );

//       return {
//         symbol,
//         profile: profileResponse.data,
//         metrics: metricResponse.data.metric,
//         quote: quoteResponse.data
//       };
//     });

//     const stockData = await Promise.all(stockDataPromises);
//     return res.json(new ApiResponse(200, stockData, "Stock data fetched successfully"));
//   } catch (error) {
//     return res.status(500).json({ message: "Error fetching stocks" });
//   }
// });

// export { getStockApiResponse };





const FINNHUB_API_TOKEN = 'csnj8upr01qqapaib3d0csnj8upr01qqapaib3dg';
// csnp331r01qkfk592tqgcsnp331r01qkfk592tr0
// csnp451r01qkfk592u80csnp451r01qkfk592u8g
const STOCK_SYMBOLS = ['AAPL', 'NVDA', 'MSFT', 'GOOGL'];
const US_MAJOR_TICKERS = [
//   'AAPL',  // Apple Inc.
//   'NVDA',  // NVIDIA Corporation
//   'MSFT',  // Microsoft Corporation
//   'GOOGL', // Alphabet Inc. (Google)
  'AMZN',  // Amazon.com, Inc.
  'META',  // Meta Platforms, Inc. (Facebook)
  'BRK.B', // Berkshire Hathaway Inc.
  'TSLA',  // Tesla, Inc.
  'AVGO',  // Broadcom Inc.
//   'LLY',   // Eli Lilly and Company
  'WMT',   // Walmart Inc.
  'V',     // Visa Inc.
//   'UNH',   // UnitedHealth Group Incorporated
//   'XOM',   // Exxon Mobil Corporation
  'ORCL',  // Oracle Corporation
//   'MA',    // Mastercard Incorporated
//   'COST',  // Costco Wholesale Corporation
//   'HD',    // The Home Depot, Inc.
//   'JNJ',   // Johnson & Johnson
//   'PG'     // Procter & Gamble Company
];
const ADDITIONAL_TICKERS = [
   'HDB',
   'IBN', 
   'INFY', 
   'WIT', 
   'RDY', 
   'MMYT', 
   // 'WNS', 
   'SIFY',
   'YTRA', 
   // 'ZCAR', 
   // 'LYT', 
   // 'RICO', 
   // 'REDIFF', 
   // 'AXIS', 
   // 'AZRG', 
   // 'TTM'
];

const getStockApiResponse = asyncHandler(async (req, res) => {
  try {
    const stockDataPromises = STOCK_SYMBOLS.map(async (symbol) => {
      const profileResponse = await axios.get(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_TOKEN}`
      );
      const metricResponse = await axios.get(
        `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${FINNHUB_API_TOKEN}`
      );
      const quoteResponse = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_TOKEN}`
      );

      return {
        symbol,
        profile: profileResponse.data,
        metrics: metricResponse.data.metric,
        quote: quoteResponse.data
      };
    });

    const usMajorDataPromises = US_MAJOR_TICKERS.map(async (symbol) => {
      const profileResponse = await axios.get(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_TOKEN}`
      );
      const quoteResponse = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_TOKEN}`
      );

      return {
        symbol,
        profile: profileResponse.data,
        quote: quoteResponse.data
      };
    });

   //  const additionalDataPromises = ADDITIONAL_TICKERS.map(async (symbol) => {
   //    const profileResponse = await axios.get(
   //      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_TOKEN}`
   //    );
   //    const quoteResponse = await axios.get(
   //      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_TOKEN}`
   //    );

   //    return {
   //      symbol,
   //      profile: profileResponse.data,
   //      quote: quoteResponse.data
   //    };
   //  });

    const stockData = await Promise.all(stockDataPromises);
    const usMajorData = await Promise.all(usMajorDataPromises);
   //  const additionalData = await Promise.all(additionalDataPromises);

    return res.json(new ApiResponse(200, { stockData, usMajorData }, "Stock data fetched successfully"));
  } catch (error) {
    return res.status(500).json({ message: "Error fetching stocks" });
  }
});













// import asyncHandler from '../utils/asyncHandler.js';
// import { Post } from '../models/Post.js';
// import { User } from '../models/User.js';
import { Post } from '../models/post.model.js';
// import ApiResponse from '../utils/ApiResponse.js';

const getUserPosts = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select('username');
  const posts = await Post.find({ owner: userId }).sort({ updatedAt: -1 });

  return res.status(200).json(new ApiResponse(200, { user, posts }, "User posts fetched successfully"));
});

// export { getUserPosts };


























export {
   registerUser,
   loginUser,
   // logoutUser,
   getApiResponse,
   getStockApiResponse,
   getUserPosts
}

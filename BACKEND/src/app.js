import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { User } from './models/user.model.js'

const app = express()


import dotenv from 'dotenv'; 
dotenv.config();
//cors use karte hai taki pata rahe konse frontend ke url se backend reply dega
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods:['GET','POST','PUT','DELETE'],
    credentials: true,
}))

//now these are the middle wares
app.use(cookieParser()) //server se user ki cookies access and set karne ke liye
app.use(express.json({limit:"20kb"})) //this will be used to tell the proram to accepta nd give json
app.use(express.urlencoded({extended:true,limit:"20kb"}))
app.use(express.static("public")) //to make somthing for the public to see


import session from 'express-session'
import passport from 'passport'
import { Strategy as OAuth2Strategy } from "passport-google-oauth2";


//ham ye use kar rahe hai taki jo cors ka issue ho rha hai frontend mai wo nhi ho , hwne api req jo hai wo agar backend se kiya jaye toh cors ka part nhi aata hai 
//this is called as setting up a proxy server ,matlab direct frontend se call nhi backend ke troing
// app.get('/news', async (req, res) => {
//     try {
//       const response = await axios.get(
//         "https://finnhub.io/api/v1/news?category=general&token=crvqbdhr01qkji45o89gcrvqbdhr01qkji45o8a0"
//       );
//       res.json(response.data); // Send the news data back to the frontend
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching news" });
//     }
//   });

//routes import
import userRouter from './routes/user.routes.js'
import connectDB from './db/indexdb.js'


//setup ********************************************************************************
app.use(session({
    secret:"skdhfjdfhhgsjgfwu34b3jheg3jh4g",
    resave:false,
    saveUninitialized:true
}))

//setup passort ******************************************************************
app.use(passport.initialize());
app.use(passport.session());

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
       user.accessToken = accessToken // ye database mai save karna hai taki google ka logonsucces ke baad ye token req.uer se mil sake , aur cookie mai ye token store ho
       await user.save({validateBeforeSave : false}) // isse hoga yr ki ham databse mai user ke iss token ko save kar denge and save hote time hamene password : as a required part dala hai lekin yaha pe toh pass nhi hai isliye hum wo extra chiz likh rahe hai
 
       return {accessToken , refreshToken}
 
    } catch (error) {
       throw new ApiError(500,"something went wrong while generating access and refresh token")
    }
 }

passport.use(
    new OAuth2Strategy({
        clientID:process.env.GOOGLE_CLIENTID,
        clientSecret:process.env.GOOGLE_SECRET,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
        async(accessToken,refreshToken,profile,done)=>{
            console.log("profile",profile)
            try{
                let user = await User.findOne({googleId:profile.id});
                if(!user){
                    user = new User({
                        googleId:profile.id,
                        username:profile.displayName,
                        email:profile.emails[0].value
                    });

                    await user.save();

                }
                const { accessToken, refreshToken } = await generateAccessTokenAndRefreshTokens(user._id); 
                user.accessToken = accessToken; 
                console.log("ye wazla",accessToken);
                user.refreshToken = refreshToken; 
                await user.save();

                return done(null,user)
            }catch(error){
                return done(error,null)
            }
        }
    )
)

passport.serializeUser((user,done) => {
    done(null,user);
})

passport.deserializeUser((user,done) => {
    done(null,user);
})

//init google auth

app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));
app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect: "http://localhost:3001/home",
    failureRedirect: "http://localhost:3001/login"
}))





//jab user login hai tabhi hi user ka data hame milega 
app.get("/login/success",async(req,res) => {
    //iska matlab agar hame user ka data milta hai(req.user) se tab user login hai 
    if(req.user){ // ye req.user aa kaha se raha hai, ye aa raha hai , google ka jo session hai udher ek part hai logion succes ke baad de rha hai wo , baki jagah hame , verify jwt se milta hai agar normal login kiya haitoh
        //abb jab user login hai and uska data mil raha hai tab wo data frontend ko bhejenege
        // const user = await User.findOne({req.user.email});
        // const {accessToken, refreshToken} = await generateAccessTokenAndRefreshTokens(user._id);

        res
        .status(200)
        .cookie("accessToken",req.user.accessToken ,{ httpOnly: true, secure: false, sameSite: 'strict', path: '/' })  // google login karne ke baad refresh token toh save ho raha hai lekin access token save nhi ho raha 
        .cookie("refreshToken", req.user.refreshToken, { httpOnly: true, secure: false, sameSite: 'strict', path: '/' })
        .json({message:"user login",user:req.user,accesstoken: req.user.accessToken,  //yaha pe ye frontend ko send hua hai, abb frontend apne documnet.cookie make ye dono tokens ko store kar lenge after login
            refreshtoken: req.user.refreshToken})
    }else{
        res.status(400).json({message:"Not Authorised"})
    }
})


app.get("/logout",(req,res,next)=> {
    req.logout(function(err){
        if(err){return next(err)}
        res.json({userLogout: true});
    })
})

//*********************************************************** */
//routes 
app.use("", userRouter)  //ye bass initail route hai , matlab ye ki jab iss route pe aa jayenge tab pura cotrol "userRouter ke file ke pass aa jayega kyu ki wo user ke related sara kaam hai waha, jaise login , register etc"


export default app

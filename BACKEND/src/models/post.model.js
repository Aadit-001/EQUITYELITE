import mongoose, {Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'


const postSchema = new Schema(
    {
        postFile: {
            type: String,  //cloudinary se
            // required: true 
        },
        // thumbnail: {
        //     type: String,  //cloudinary se
        //     required : true
        // },
        title: {
            type:String,
            // required: true
        },
        description: {
            type: String, 
            // required: true
        },
        // duration: {
        //     type: Number, //cloudinary hi time bhejta hai
        //     required: true
        // },
        // views: {
        //     type: Number,
        //     default : 0
        // },
        isPublished: {   //chize public hai ki nahi
            type: Boolean,
            default:true
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref : "User"
        }
    },
    {
        timestamps: true,
    }
)


postSchema.plugin(mongooseAggregatePaginate)
export const Post = mongoose.model("Post", postSchema)

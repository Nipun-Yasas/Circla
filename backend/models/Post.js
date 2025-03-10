import first from "ee-first";
import { last } from "lodash";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    location:String,
    descriptipn:String,
    picturePath:String,
    userPicturePath:String,
    likes:{
        type: Map,
        of:Boolean,
    },
    comments:{
        types:Array,
        default:[],
    },
    
    },
    {timestamps:true}
);

const Post = mongoose.model("Post",postSchema);
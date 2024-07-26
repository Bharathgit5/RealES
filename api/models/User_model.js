import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
       
    },
    avatar:{
  type:String,
  default:"https://www.bing.com/ck/a?!&&p=12df5dcbec177af5JmltdHM9MTcyMTg2NTYwMCZpZ3VpZD0xMzJkYjZjZC0zMzRlLTZhMWEtMDAxZS1hMmMyMzJiOTZiMzAmaW5zaWQ9NTY3NA&ptn=3&ver=2&hsh=3&fclid=132db6cd-334e-6a1a-001e-a2c232b96b30&u=a1L2ltYWdlcy9zZWFyY2g_cT1qYmlldCUyMGxvZ28mRk9STT1JUUZSQkEmaWQ9MEY0NDQzNDRBQTA3QjJDODdFMDc0Njk4NDEyMzBCRjQ2RDc5NzFFOQ&ntb=1"
    },
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;
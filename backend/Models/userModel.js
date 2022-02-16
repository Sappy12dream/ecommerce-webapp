require('dotenv').config({path:'./backend/config/config.env'});
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter name'],
        maxlength:[50,'Name cannot exceed 80 character'],
        minlength:[4, 'Name should have atleat 4 character' ]
    },
    email:{
        type:String,
        required:[true, 'Please enter name'],
        unique:true,
        validate: [validator.isEmail,'Please enter a valid email'],
    },
    password:{
        type:String,
        required:[true, 'Please enter name'],
        minlength:[8, 'Name should have atleat 8 character' ],
        select:false
    },
    avatar:
        {
        pid:{
            type:String,
            required:[true,'PID required']
        },
        url:{
            type:String,
            required:[true,'url']
        }
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
    
})

userSchema.methods.getJwtToken = function (){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
    
}
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}


module.exports = mongoose.model('user', userSchema)
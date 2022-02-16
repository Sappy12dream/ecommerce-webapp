const User = require('../Models/userModel');
const ErrorHandler = require('../Utils/errorHandler');
const asyncError = require('../Middleware/asyncError')
const sendToken = require('../Utils/sendToken')

exports.createUser=asyncError(async(req, res, next)=>{
    const{name, email, password} = req.body

    const user = await User.create({name, email, password,avatar:{
        pid:'pid',
        url:'url'
    }})

    sendToken(user,201,res)

})

exports.loginUser=asyncError(async(req, res, next)=>{
    const{email,password} = req.body

    if(!email || !password){
        return next(new ErrorHandler('please enter name & password',400))
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler('Invalid email or password'), 401)
    }
    const ispasswordMatched = await user.comparePassword(password);
    console.log(ispasswordMatched)

    if(!ispasswordMatched){
        return next(new ErrorHandler('Invalid email or password'), 401)
    }
    
    sendToken(user,200,res)
})


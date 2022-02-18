const User = require('../Models/userModel');
const ErrorHandler = require('../Utils/errorHandler');
const asyncError = require('../Middleware/asyncError')
const sendToken = require('../Utils/sendToken')
const sendEmail = require('../Utils/sendEmail')

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

    if(!ispasswordMatched){
        return next(new ErrorHandler('Invalid email or password'), 401)
    }
    
    sendToken(user,200,res)
})

exports.logOutUser = asyncError(async(req,res,next)=>{

    res.cookie('token', null, {
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"logged out"
    })

})


exports.forgotPassword = asyncError(async (req,res,next)=>{
    const user = await User.findOne({
        email:req.body.email
    })
    console.log(user.email);

    if(!user){
        return next('user not found', 404)
    }

    const resetToken = user.getResetpassToken()
    await user.save({validateBeforeSave:false});

    const resetPassUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    console.log(req.protocol,req.get('host'));

    const message = `YourReset Password Token is \n\n ${resetPassUrl} \n if not requested please ignore`

    try {
        await sendEmail({
            email: user.email,
            subject: 'recover password',
            message

        })

        res.status(201).json({
            success:true,
            message: 'msg send successfully'
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500))

        
    }


})
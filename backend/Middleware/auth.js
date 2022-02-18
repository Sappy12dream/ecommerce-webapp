const ErrorHandler = require("../Utils/errorHandler");
const jwt = require('jsonwebtoken')
const asyncError = require("./asyncError");
const User = require('../Models/userModel')

exports.isAuthUser = asyncError (async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler('please login to access resource', 401))
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodedData.id);

    next()

})

exports.authRoles=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler(`Role: ${req.user.role}, not required to access this resource`,403)

            )
        }
        next();

    }

}

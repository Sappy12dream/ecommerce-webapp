const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Product name required']
    },
    description:{
        type:String,
        required:[true,'Product description required']
    },
    price:{
        type:Number,
        required:[true,'Product price required'],
        maxLength:[8, "Price can't exceed 8 figure"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
        pid:{
            type:String,
            required:[true,'PID required']
        },
        url:{
            type:String,
            required:[true,'url']
        }
    }
    ],
    category:{
        type:String,
        required:[true,'category required']
    },
    stock:{
        type:Number,
        required:[true,'stock required'],
        maxLength:[4, "Price can't exceed 4 figure"],
        default:1
    },
    numberOfReviews:{
        type:Number,
        default:0,
    },
    reviews:[{
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }

}) 

module.exports = mongoose.model('product',productSchema)
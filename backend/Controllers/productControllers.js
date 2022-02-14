const Product = require('../Models/productModel');
const ErrorHandler = require('../Utils/errorHandler');
const asyncError = require('../Middleware/asyncError')

exports.createProduct = asyncError(async (req,res,next)=>{
        const product = await Product.create(req.body)
        res.status(201).json(product);
})


exports.getAllProducts = asyncError(async(req,res)=>{

    const products = await Product.find({})
    res.status(201).json(products);
    } )


exports.updateProduct = asyncError(async(req,res,next)=>{
        let product = await Product.findById(req.params.id)
        if(!product){
            return next(new ErrorHandler('product not found', 404))
        }
        product = await Product.findByIdAndUpdate(req.params.id,req.body)
        res.status(201).json(product);
})

exports.deleteProduct = asyncError(async(req,res,next)=>{ 
        let product = await Product.findById(req.params.id)
        if(!product){
            return next(new ErrorHandler('product not found', 404))
        }
        await product.remove()
        res.status(201).json({
                success: true,
                msg: 'product deleted'
            });
    
})

exports.getProduct = asyncError(async(req,res,next)=>{
      
        const product = await Product.findById(req.params.id)

        if(!product){
            return next(new ErrorHandler('product not found', 404))
        }
        else{
            res.status(201).json({
                success: true,
                product 
            });

        }
})
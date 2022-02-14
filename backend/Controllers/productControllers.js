const Product = require('../Models/productModel');
const ErrorHandler = require('../Utils/errorHandler');
const asyncError = require('../Middleware/asyncError')
const ApiFeatures = require('../Utils/apiFeatures')

exports.createProduct = asyncError(async (req,res,next)=>{
        const product = await Product.create(req.body)
        res.status(201).json(product);
})


exports.getAllProducts = asyncError(async(req,res)=>{
    const resultPerPage = 10
    const apiFeatures = new ApiFeatures(Product.find({}), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeatures.query;
    res.status(201).json({nbHits: products.length, products});
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
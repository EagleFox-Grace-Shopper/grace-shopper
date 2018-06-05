//api get for product info
const router = require('express').Router();
const db = require('../db')
const Product = require('../db/models/product')


router.get('/', (req,res, next) => { 
  try{
    const productsAll = Product.findAll();
    res.json(productsAll);
  }catch(error){
    next(error)
  }
}

router.get('/:id', (req,res,next) => {
  try{
    const productById = Product.findById(req.params.id);
    res.json(productById);
  }catch(error){
    next(error)
  }
}

router.post('/:id', (req,res,next) =>{
  //
}

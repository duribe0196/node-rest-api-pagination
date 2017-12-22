const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/product');

// Routes
router.get('/',(req,res)=>{
    res.render('index');
});

router.get('/add-product',(req,res)=>{
    res.render('products/add-product');
});

router.get('/products/:page',(req,res,next)=>{
    let perPage = 6;
    let page = req.params.page || 1;

    Product.find({})
    .skip((perPage * page) -perPage)
    .limit(perPage)
    .exec((err,productos)=>{
        Product.count((err,cuenta)=>{
            if(err){return next(err)};
            res.render('products/products',{
                productos,
                current: page,
                pages: Math.ceil(cuenta/perPage)
            });
        })
    })
});

router.post('/add-product',(req,res)=>{
    const product = new Product();
    product.category = req.body.category_name;
    product.name = req.body.product_name;
    product.price = req.body.product_price;
    product.cover = faker.image.image();
    product.save(err=>{
        if(err){return next(err)}
        res.redirect('/add-product');
    });

});

router.get('/generate-fake-data',(req, res)=>{
    for(let i=0; i<20;i++){
        const product = new Product();
        product.category = faker.commerce.department();
        product.name = faker.commerce.productName();
        product.price = faker.commerce.price();
        product.cover = faker.image.image();
        product.save(err=>{
            if (err) {return next(err);}
        });
    }
    res.redirect('/add-product');
    
});

module.exports = router;

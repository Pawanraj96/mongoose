const express = require('express')
const router = express.Router()
const product = require('../models/product.js')         // here in product all data present in schema is present. here product is collection name.

// get data
router.get('/products', async (req, res) => {           // use async and await in order to do syncronization becoz it takes time to execute.
    try {
        const products = await product.find().lean()    // if you dont use lean() data will be in buffer state.
        //  without lean we cant send data to frontend. 
        // lean converts buffer to string                   // to find data from database we have find method.
        // console.log(products);                              // This products is used in table to render.
        // res.end('Routes working')
        res.render('./products.handlebars', { products })
    } catch (err) {
        // console.log(err);
        res.redirect('/products/error')
    }
})

//add
router.get('/add-product', (req, res) => {
    res.render('./addProduct.handlebars')
})
router.post('/add-product', async (req, res) => {
    // console.log(req.body);
    let { pName, pDesc, pPrice } = req.body
    // console.log(typeof(pPrice));
    // pPrice = parseInt(pPrice)
    try {
        await product.insertMany({              //colection name.insert({})
            pName,
            pDesc,
            pPrice
        })
        res.redirect('/products/products')
    } catch (err) {
        res.redirect('/products/error')
    }
})
// delete
router.get('/delete-product/:_id', async (req, res) => {
    // console.log(req.params._id);
    const _id = req.params._id
    try {
        //delete one
        await product.deleteOne({
            _id
        })
        //delete multiple we dont use it
        // await product.deleteMany({
        //     _id:[
        //      '624adcfd0d01f0a27d2a70f8','624ab80f2cb7a4c1d9fc12a0'
        //     ]
        // })
        res.redirect('/products/products')
    } catch (err) {
        res.redirect('/products/error')
    }
})

//edit
router.get('/edit-product/:_id', async (req, res) => {
    const _id = req.params._id
    try {
        const selectedProduct = await product.findOne({
            _id
        }).lean()                                       // remember to apply lean() or else you will not get the output
        console.log(selectedProduct);
        res.render('./editProduct.handlebars', { selectedProduct })
    } catch (err) {
        res.redirect('/products/error')
    }
})
router.post("/edit-product/:_id", async (req, res) => {
    console.log(req.body);
    const _id = req.params._id    // here we are getting only body values(like pName,pDesc,pPrice) no _id bcoz no _id field in editProduct form
    try {
        const { pName, pDesc, pPrice } = req.body
        await product.updateOne({ _id }, {
            $set: {           // collection.updateOne({selection},{projection})
                pName,
                pDesc,
                pPrice
            }
        })
        res.redirect('/products/products')
    } catch (err) {
        res.redirect('/products/error')
    }
})



// in order to display the error message
router.get('/error', (req, res) => {
    res.send('Something went wrong')
})


module.exports = router

// Schema it provides structure of Database.
const mongoose = require('mongoose')
const schema = mongoose.Schema

const productSchema = new schema({      // here we are making structured.If we dont pass type then it will be unstructured.It can take any value.
    pName: {                            // _id will be generated automatically by mongodb.
        type: String,
        required: true
    },
    pDesc: {
        type: String,
        required: true
    },

    pPrice: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('products',productSchema)  // Model method is present in mongoose // 1st parameter collection name if it is not present means it will create automatically. 
// 3rd is optional if we dont pass 1st parameter then pass here.
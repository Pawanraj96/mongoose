const express = require('express')
const req = require('express/lib/request')
const app = express()
const exphbs = require('express-handlebars')
const PORT = 3000
const mongoose = require('mongoose')
// const dbUrl = 'mongodb+srv://pawanraj:Padubettu%4096@cluster0.x5uk8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const dbUrl = 'mongodb+srv://pawanraj:Padubettu%4096@cluster0.x5uk8.mongodb.net/shoppingApp?retryWrites=true&w=majority'
const productRoute = require('./routes/products.js')

//Set template engine
app.engine('handlebars', exphbs())                      // myFirstDatabase in url is database name if it is not present means it will create automatically.
app.set('view engine', 'handlebars')

// parse middleware
app.use(express.urlencoded({extended:true}))

// Router middleware
app.use('/products',productRoute)

// mongoose connection
mongoose.connect(dbUrl, {               // dbUrl we are getting the link from mongoDB.
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('DB connection succesfull');
    }
    else {
        console.log(err);
        console.log('DB connection unsuccesfull');
    }
})

app.get('/',(req,res)=>{
    res.render('./landingPage.handlebars')
})


app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
})
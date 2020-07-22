//BRINGING IN DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const Store = require('./Models/store').Store;
const path = require('path');
const logger = require('morgan');
const flash = require('connect-flash');

// DEFINE EXPRESS FUNCTION
const app = express();
const port = 2000;


mongoose.connect('mongodb://localhost:27017/Rannysoftapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((response) => {
    console.log("Rannysoft Database connected successfully");
}).catch((error) => {
    console.log(error);
});


//CONFIGURING/INITIALLIZING EXPRESS APP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// CONFIGURING LOGGER
app.use(logger('dev'));
app.use(flash());


//CONFIGURING EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')


//HOME ROUTE
app.get('/', (req, res) => {
    res.render('index.ejs')
})

// ABOUT ROUTE
app.get('/about', (req, res) => {
    res.render('about.ejs')
})

// REGISTER GET ROUTE
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

// REGISTER POST ROUTE
app.post('/register', (req, res) => {
    let = {
        store_name,
        email,
        password,
        confirm_password,
        address,
        phone_number
    } = req.body;
    
    // if(password.length > 5) {
    //     console.log("password must not be more than 5 characters!");
    // }else{
    //    res.redirect('/register');
    // }


    if(password != confirm_password) {
        console.log("passwords do not match!");
        res.redirect('/register');
    }else{
        const newstore = new Store({
            store_name: store_name,
            email: email,
            password: password,
            phone_number: phone_number,
            address: address
        })
        newstore.save();
        res.redirect('/register')
    }
});


//SERVER LISTENING
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
});




//Note

// nodejs is a runtime javascript environment
//express is a framework for building node app
// MVC model= Model=database schema, Views=interface, Controller=business logic

const express = require("express");

const router = express.Router();
const userService = require('../../../services/user.service');
const bcrypt = require('bcryptjs')
const { uuid } = require('uuidv4');
const categoryService = require("../../../services/category.service");

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

router.get("/", async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.render('customer/register', {layout: 'customer-main', categories, orders: [], cartQuantity: 0})
    }
    catch(error){
        console.log(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        let {name, email, pass1, pass2, dob, phone} = req.body;
        let err = [];
        const newUser = await userService.checkIfExists(email);
        var patt = new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/);
        if(!name||!email||!pass1||!pass2||!dob||!phone){
            err.push({message: "Please Enter all fields", check: "alert-dangershow"});
        }
        if(newUser){
            err.push({message: "Your email had already in used", check: "alert-danger fade show"});
        }
        if(pass1.length<6){
            err.push({message: "Password should be at least 6 characters", check: "alert-danger fade show"});
        }
        if(!validateEmail(email)){
            err.push({message: "Email is not valid", check: "alert-danger fade show"});
        }
        if(pass1!=pass2){
            err.push({message: "Passwords do not match", check: "alert-danger fade show"});
        }
        if(!patt.test(phone)){
            err.push({message: "Invalid numberphone", check: "alert-danger fade show"});
        }
        if(err.length>0){
            res.render("customer/register", {err, categories});
        }
        else{
            //Validation has passed
            let hashPassword = await bcrypt.hash(pass2, 10);
            let hashID = await uuid();
            const addedUser = userService.createNewUser(hashID, name, email, hashPassword, dob, phone);
            err.push({message: "Successful", check: "alert-info fade in"})
            res.render("customer/register", {err, categories});
        }
    }
    catch(error){
        console.log(error);
    }
});

module.exports = router;
const express = require
const router = express.Router()
const { request, response } = require("express")
const userModel = require("../models/user.model")
router.get('/signup', (req, res)=>{
    res.render('signup')
})

router.post("/signup", (request, response) =>{
    console.log(request, response);
    const newUser = new userModel(request, response);
    newUser
    .save()
    .then(() => {
        console.log("user saved successfully");
        res.direct("login");
    })
    .catch((err)=>{
        console.log("Error saving user:", err)
        res.status(500).send(`Error saving user: ${err}`)
    });
});

router.get('/login', (request, response) =>{
    console.log(request.body);
    const userData = {
        email: request.body.email,
        password: request.body.password
    }
    console.log(userData);
    userModel.findone({email: userData.email})
    ,then((user) =>{
        console.log(user);
        if (!user || user == null) {
            return res.status(404).send
            ('user not found')
        } else{
            if (user.password== userData.password) {
                return res.status(201). send
            }
        }
    })
})
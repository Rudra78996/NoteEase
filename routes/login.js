const express = require('express');
const route = express.Router();
const path = require('path');
const connection = require('../db');
const jwt = require('jsonwebtoken');

route.get("/", (req, res)=>{
    let message = "";
    res.render("login.ejs" ,{message});
});
function userAuthentication(req, res, next){
    let q = 'SELECT count(*) FROM loginDetails WHERE email = ? AND password = ?';
    connection.query(q, [req.body.email, req.body.password], (error, result)=>{
        if(error){
            throw error
        }
        if(result[0]['count(*)']=="0"){
            let message = "Invalid User"
            res.render("login.ejs" ,{message});
        }else if(result[0]['count(*)']=="1"){
            next();
        }
    });
};
route.post("/", userAuthentication, (req, res)=>{
    let q = 'SELECT * FROM loginDetails WHERE email = ?';
    connection.query(q, req.body.email, (error, result)=>{
        if(error){
            throw error
        }else{
            // console.log(result[0]);
            const token = jwt.sign(result[0], process.env.MY_SECRET, { expiresIn: "1h"});
            res.cookie("access_token", token, {
                httpOnly: true
            });
        }
        return res.redirect("/home");
    });
});
module.exports = route;
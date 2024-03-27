const express = require('express');
const route = express.Router();
const connection = require("../db");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
function userAuthentication(req, res, next){
    let {email} = req.body;
    let q = 'SELECT COUNT(*) FROM loginDetails WHERE email = ?';
    try{
        connection.query(q, email, (error, result)=>{
           if(result[0]['COUNT(*)']=="0"){
               next();
           }else{
            let message = "This email already used"
            res.render("newAccount.ejs", {message});
           }
        });
    }catch(error){
        res.send(401, "server problem");
    }
}
route.post("/newAccount", userAuthentication, (req, res)=>{
    const id = uuidv4();
    let q = 'INSERT INTO loginDetails (username, email, password, id) VALUES (?, ?, ?, ?)';
    connection.query(q, [req.body.name, req.body.email, req.body.password, id], (error, result)=>{
        if(error){
            throw error
        }else{
            let q2 = `CREATE TABLE ${id.replaceAll("-","")} (notes MEDIUMTEXT)`;
            connection.query(q2, (error, result)=>{
                if(error) throw error;
                console.log(result);
            }) 
            let message = "Account created login";
            res.render("newAccount.ejs" ,{message});
        }
    });
});
route.get("/newAccount", (req, res)=>{
    let message = "";
    res.render("newAccount.ejs" ,{message});
});
module.exports = route;
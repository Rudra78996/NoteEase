const express = require("express");
const route = express.Router();
const connection = require("../db");
const cookieJwtAuth = require("../middleware/cookieJwtAuth");
route.post("/delete", cookieJwtAuth, (req, res)=>{
    let q = `DELETE FROM ${req.user.id.replaceAll("-", "")} WHERE notes = "${req.body.note}"`
    // console.log(q);
    connection.query(q, (error, result)=>{
        if(error) throw error;
        // console.log(result);
    });
});
module.exports = route;
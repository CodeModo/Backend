
const express = require("express");
const routes = express.Router();

admins = [
    {id:1,name:"Moussa Elenany",email:"moussa@codemodo.com",password:"12345"},
    {id:2,name:"Afnan Wahid",email:"afnan@codemodo.com",password:"12345"},
    {id:3,name:"Rokaia Ghareeb",email:"rokaia@codemodo.com",password:"12345"},
    {id:4,name:"Sayed Mohamed",email:"sayed@codemodo.com",password:"12345"},
    {id:5,name:"Eslam Gamal",email:"Eslam@codemodo.com",password:"12345"},
    {id:6,name:"Alaa Adel",email:"alaa@codemodo.com",password:"12345"},
    {id:7,name:"Tahany Magdy",email:"tahany@codemodo.com",password:"12345"},
];
/* Get All Admins*/
routes.get('/',(req,res)=>{
    res.send(admins);
});
/* Get Admin with id */
routes.get('/:id',(req,res)=>{
    
    //Temp before database

    const admin = admins.find(a => a.id == parseInt(req.params.id));
    if(!admin) return res.status(404).send('Admin with givin id is not found');

    return res.send(admin);
});

module.exports = routes;
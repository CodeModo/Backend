
const express = require("express");
const routes = express.Router();
const { body, validationResult } = require('express-validator');
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
/*Add new Addmin*/
routes.post('/add',
    body('email').trim().not().isEmpty()
        .withMessage('email is required'),
    body('email').isEmail()
        .withMessage('invalid email format'),    
    body('name').trim().not().isEmpty()
        .withMessage('name is required'),
    body('name').trim().isLength({min:3})
        .withMessage('name must be more than or equal 3 characters'),  
    body('password').trim().isLength({min:6})
        .withMessage('password must be more than or equal 6 charactes')
    ,
    body('password').trim().not().isEmpty()
        .withMessage('password is required')
    ,(req,res)=>{
    //Errors     
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send({ error: errors.errors[0].msg });

    adminId = admins.length+1;
    adminName = req.body.name;
    adminEmail = req.body.email;
    addminPassword = req.body.password;
    admins.push({id:adminId,name:adminName,email:adminEmail,password:addminPassword});
    return res.send(`admin id is : ${req.body.name}`);
});
routes.put('/update/:id',(req,res)=>{
    return res.send(`update ${req.params.id}`);
});
routes.delete('/delete/:id',(req,res)=>{

});

module.exports = routes;
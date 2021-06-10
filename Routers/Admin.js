
const express = require("express");
const routes = express.Router();
const { body, validationResult } = require('express-validator');
const Admin = require('../Models/Admin');
const bcrypt=require('bcrypt')

/* Get All Admins*/
routes.get('/',async (req,res)=>{
    const admins = await Admin.find().select('-password');
    res.send(admins);
});
/* Get Admin with id */
routes.get('/:id',async (req,res)=>{
   
    const admin = await Admin.findById(req.params.id).select('-password');
    if(!admin)
        return res.status(404).send({message:"Admin with givin id is not found"});
    return res.send(admin);
});
/*Add new Admin*/
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
        .withMessage('password must be more than or equal 6 char')
    ,
    body('password').trim().not().isEmpty()
        .withMessage('password is required')
    ,async (req,res)=>{
    //Request data errors     
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
        return res.status(400).send({ error: errors.errors[0].msg });
    
    adminName = req.body.name.trim();
    adminEmail = req.body.email.trim().toLowerCase();
    adminPassword = req.body.password;

    //Admin is already registered
    if(await Admin.findOne({email:adminEmail})) 
        return res.status(400).send({error:'Email is already taken'})
    //Create new admin 
    const admin = new Admin({
        name : adminName,
        email: adminEmail,
        password: adminPassword
    });
    //Hashing password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password,salt)

    ///// save new admin
    try{
        await admin.save()
        return res.send({message:'admin was registered successfully',id:admin._id}) 
    }
    catch(err){
        res.send({error:'Unknown error try again later!'}) 
    }

    return res.send(admin);
});
//Update admin info 
routes.put('/update/:id',async (req,res)=>{
    try{
        const admin = await Admin.findById(req.params.id);
        //Check for what field will be updated
        let updates = {
            email: (req.body.email != "" && req.body.email != null) ? req.body.email : admin.email,
            name: (req.body.name != "" && req.body.name != null) ? req.body.name : admin.name,
            password: (req.body.password != "" && req.body.password != null) ? req.body.password : admin.password,
          }

        
        if(req.body.password != "" && req.body.password != null){
            //Hashing password
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(admin.password,salt)
        }
        //Saving updates
        update = await Admin.findByIdAndUpdate(req.params.id, updates, {
            new: true
        });
       
        if(update){
            return res.send({message:"Admin info is updated successfully"});
        }else{
            return res.send({message:"Unknown error try again later!"});
        }
      
    }catch(err){
        return res.status(404).send('Admin with givin id is not found');
    }
});
//Delete admin info
routes.delete('/delete/:id',async (req,res)=>{
    const admin = await Admin.findByIdAndRemove(req.params.id);
    if(admin){
        return res.send({message:"Admin has been removed successfully "})
    }
    return res.status(404).send({message:"admin with givin id is not found"})
});

module.exports = routes;
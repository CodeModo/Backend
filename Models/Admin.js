const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name:String,
    email:{type:String,required:true,validate: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/},
    password:{type:String,required:true}
});

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;
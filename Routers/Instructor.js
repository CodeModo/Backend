const express = require("express");
var bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const cors = require("cors");

const authentication = require("../Middleware/Authentication");
const authorization = require('../Middleware/Authorization'); 

const jwt = require("jsonwebtoken");
const Instructor = require("../Models/Instructor");

const instructorRouter = new express.Router();
instructorRouter.use(cors());

instructorRouter.post("/register", async (req, res, next) => {
  try {
    const { name, email, phone, password, specialization, achievements } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const instructor = await Instructor.create({
      name: name,
      email: email,
      phone: phone,
      password: hash,
      specialization: specialization,
      achievements: achievements,
    });
    res.statusCode = 200;
    res.send({ message: "register-successfully" });
    next();
  } catch (err) {
    res.statusCode = 401;
    res.send(err);
    console.log(err);
    next();
  }
});

instructorRouter.post("/login", async (req, res, err) => {
  try {
    const { name, password } = req.body;
    const instructor = await Instructor.findOne({ name: name });
    if (!instructor) {
      err = new Error("wrong username ");
      res.statusCode = 401;
      res.send(err);
      console.log(err);
    }

    const isMatch = await bcrypt.compare(password, instructor.password);
    if (!isMatch) {
      err = new Error("wrong password");
      res.statusCode = 402;
      res.send(err);
      console.log(err);
    }
    const token = jwt.sign({ id: instructor.id, role : instructor.role }, "my-signing-secret");
    const newName = instructor.name;
    const email = instructor.email;
    const phone = instructor.phone;
    const specialization = instructor.specialization;
    const achievements = instructor.achievements;
    res.statusCode = 200;
    res.send({
      token: token,
      name: newName,
      email: email,
      phone: phone,
      specialization: specialization,
      achievements: achievements,
      message: "login-successfully",
    });
  } catch (err) {
    res.statusCode = 422;
    res.json({ success: "false", message: err.message });
    console.log(err);
    next();
  }
});

instructorRouter.use([authentication, authorization.instructor]);

instructorRouter.patch("/edit/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, password, specialization, achievements } =
      req.body;
    const hash = await bcrypt.hash(password, 10);
    const { authorization } = req.headers;
    const signedData = jwt.verify(authorization, "my-signing-secret-ins");
    var result = await Instructor.updateOne(
      { _id: signedData.id },
      {
        name: name,
        password: password,
        email: email,
        phone: phone,
        specialization: specialization,
        achievements: achievements,
      }
    );
    res.statusCode = 200;
    res.send({ message: "updated successfully", success: true });
  } catch (err) {
    res.statusCode = 401;
    res.send({ success: false, message: err });
    console.log(err);
    next();
  }
});

instructorRouter.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Instructor.deleteOne({ _id: id });
    res.statusCode = 200;
    res.send({ message: "deleted successfully", success: true });
  } catch (err) {
    res.statusCode = 401;
    res.send({ success: false, message: err });
    console.log(err);
    next();
  }
});

module.exports = instructorRouter;

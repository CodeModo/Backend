const express = require("express");
const parentRouter = new express.Router();
const Parent = require("../Models/Parent");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authentication = require("../Middleware/auth");

/// base path ===> /api/parent

//// Register
parentRouter.post("/register", async (req, res) => {
  try {
    const { Name, Password, Email, Phone, Address } = req.body;
    const isExist = await Parent.findOne({ Email }).exec();
    if (isExist) {
      res.statusCode = 409;
      res.send(`Email is already registered `);
      return;
    }
    const hash = await bcrypt.hash(Password, 10);
    const user = await Parent.create({
      Name,
      Password: hash,
      Email,
      Phone,
      Address,
    });
    const children = await Parent.updateOne(
      { _id: user._id },
      { $push: { Children: [req.body.child] } }
    );
    res.statusCode = 201;
    res.send(user);
  } catch (error) {
    res.statusCode = 422;
    console.error(error);
    res.send(error);
  }
});

/////Login
parentRouter.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await Parent.findOne({ Email }).exec();
    if (!user) throw new Error("wrong Email or Password");
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) throw new Error("wrong username or password");
    //generate token
    const token = jwt.sign({ id: user.id }, "my-signing-secret");
    res.json({ token });
  } catch (err) {
    if (err) {
      console.error(err);
      res.statusCode = 422;
      res.json({ success: false, message: err.message });
      //  return;
    }
  }
});

// All parent
parentRouter.get("/", async (req, res) => {
  try {
    const user = await Parent.find({}, { Password: 0 });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

//get parent

parentRouter.get("/:id", async (req, res) => {
  try {
    const parent = await Parent.findOne(
      { _id: req.params.id },
      { Password: 0 }
    );
    res.send(parent);
  } catch (error) {
    res.statusCode = 422;
    res.send(error);
  }
});

/// authentication
parentRouter.use(authentication);

//// add new Child
// ==========> API ???
// parentRouter.patch("/Child/:id", async (req, res) => {
//   try {
//     // const user = await User.findOne({ _id: req.params.id });
//     const children = await Parent.updateOne(
//       { _id: req.params.id },
//       { $push: { Children: req.body.child } }
//     );
//     res.json({ message: "Updated successfully" });
//   } catch (error) {
//     res.statusCode = 422;
//     res.send(error);
//   }
// });

// remove child
// parentRouter.patch("/removeChild/:id", async (req, res) => {
//   try {
//     // const user = await User.findOne({ _id: req.params.id });
//     const children = await Parent.updateOne(
//       { _id: req.params.id },
//       { $pull: { Children: req.body.child } }
//     );
//     res.json({ message: "Updated successfully" });
//   } catch (error) {
//     res.statusCode = 422;
//     res.send(error);
//   }
// });

// update
parentRouter.patch("/:id", async (req, res) => {
  try {
    const user = await Parent.findOne({ _id: req.params.id });
    const Name = req.body.Name || user.Name;
    const Email = req.body.Email || user.Email;
    const Phone = req.body.Phone || user.Phone;
    const Address = req.body.Address || user.Address;

    if (req.body.password) {
      const password = req.body.password;
      const hash = await bcrypt.hash(password, 10);
      const updatedPassword = await Parent.updateOne(
        { _id: req.signedData.id },
        {
          password: hash,
        }
      );
    }

    const updatedUser = await Parent.updateOne(
      { _id: req.params.id },
      {
        Name,
        Email,
        Phone,
        Address,
      }
    );
    res.send(updatedUser);
  } catch (error) {
    res.statusCode = 422;
    res.send(error);
  }
});

//delete

parentRouter.delete("/:id", async (req, res) => {
  try {
    const user = await Parent.deleteOne({ _id: req.params.id });
    res.send("user was deleted");
  } catch (error) {
    res.statusCode = 422;
    console.error(error);
    res.send(error.message);
  }
});

module.exports = parentRouter;

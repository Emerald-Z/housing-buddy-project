const express = require("express");
const path = require("path");
const fs = require("fs");
const firebase = require("./firebase");
const db = firebase.db;
const cors = require('cors');
const bucket = require("./firebase.js").bucket;

require("dotenv").config();

// Route Handler
const users = express.Router();
users.use(express.json());
users.use(cors());

// users.use("/auth", require("./auth").authMiddleware);
// const authorize = require("./auth");

users.post('/', async (req, res) => {
    try {
      const user = req.body.user;
      const users = await db.collection('users');
  
      const new_user = { name: user.name, email: user.email, id: user.user_id, review: "", apartment: "" };

      const user_exists = (await users.doc(user.user_id).get()).exists;

      if (!user_exists) {
        const newSnapshot = await db.collection('users').doc(user.user_id).set(new_user);
        const result = await users.doc(user.user_id).get();
        return res.json({ msg: "Created a new user", data: result.data(), newUser: true });
      } else {
        const result = await users.doc(user.user_id).get();
        return res.json({ msg: "User already exists", data: result.data(), newUser: false });
      }
  
    } catch (error) {
      return res.status(400).send(`User should contain firstName, lastName, email`)
    }
  });

//get user info
users.get("/info/:user_id", async(req, res) => {
    let uid = req.params.user_id;
    const user = db.collection("users").doc(uid);
    // const query = await apartments.where('apartment', '==', apartment).get();
    const query = await user.get();

    res.status(200).json(query.data());
})

  users.put("/apartment/", async(req, res) => {

    const body = req.body
      if(body.apartment == undefined || body.user_id == undefined) {
          return res.json({
            msg: "Error: user, apartment not defined in request",
            data: {},
          });
      }
  
      const query = await db.collection("users").doc(body.user_id).update({apartment: body.apartment});
      res.status(200).json(query);
  })

  module.exports = {users};
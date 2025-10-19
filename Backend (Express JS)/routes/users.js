var express = require('express');
const User = require('../models/User');
const Crew = require('../models/Crew');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const cors = require('cors')

require("dotenv").config();

var router = express.Router();

router.options('*', cors())

router.get('/crew', cors(), async function(req, res, next) {
  try {
    const docs = await Crew.find({})
    if (docs.length > 0) {
        
        res.status(200).send({"crew": docs})
    } else {
        
        res.status(200).send({"alert": "No crew members"})
        
    }
  } catch (error){
      
      res.status(203).send({"err": "Something went wrong"}) 
  }
});

router.get('/delete-crew/:crew_id', cors(), async function(req, res, next) {
  const crew_id = req.params.crew_id

  try {
    await Crew.deleteOne({ _id: crew_id });
    res.status(200).send({"msg": "Crew Member Deleted"})
    
  } catch (error){
    res.status(203).send({"err": "Something went wrong"}) 
  }

});

router.post('/edit-crew', cors(), async (req, res, next)=>{
  const crewID = req.body.crewID
  const email = req.body.email;
  const fullName = req.body.fullName
  const role = req.body.role
  const description = req.body.description
  const phone = req.body.phone
  const image = req.body.imageURL
  
  try {
    const doc = await Crew.findOneAndUpdate({_id: crewID}, { email: email,fullName: fullName ,role: role ,description: description ,phone: phone, image: image}, {
      new: true
    });
    
    
    res.status(200).send({"msg": "Crew Member Updated"})
  } catch (error) {
    
    res.status(203).send({"err": 'Make sure all fields are filled'}); 
  }
  
})

router.post('/add-crew', cors(), async function(req, res){
  const email = req.body.email;
  const fullName = req.body.fullName
  const role = req.body.role
  const description = req.body.description
  const phone = req.body.phone
  const image = req.body.imageURL

  const newCrew = new Crew({ email: email,fullName: fullName ,role: role ,description: description ,phone: phone, image: image});

  try {
    await newCrew.save()
    res.status(200).send({"msg": "Crew member added"})
  } catch (error) {
    res.status(203).send({"err": 'Make sure all fields are filled'}); 
  }

})

router.post('/admin-login', cors(), (req, res)=>{
  const usernameOrEmail = req.body.usernameOrEmail;
  const password = req.body.password

  User.findOne({email: usernameOrEmail}).then(user=>{
    if (user) {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        // res == true or res == false
        if (isMatch) {
            var token = jwt.sign({
              "user": {
                "email": user.email,
                "username": user.username,
              }
            }, process.env.jwt_secret, { expiresIn: '1h' });
            res.status(200).send({"token": token}) 
        } else {
          res.status(200).send({"err": "Invalid username/email or password"}) 
        }
      })
    } else {
      User.findOne({username: usernameOrEmail}).then(user=>{
        if (user) {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            // res == true or res == false
            if (isMatch) {
                var token = jwt.sign({
                  "user": {
                    "email": user.email,
                    "username": user.username,
                  }
                }, process.env.jwt_secret, { expiresIn: '1h' });
                res.status(200).send({"token": token}) 
            } else {
              res.status(200).send({"err": "Invalid username/email or password"}) 
            }
          })
        } else {
          res.status(200).send({"err": "Invalid username/email or password"})
        }
      })
    }
  })

})


router.post('/admin-register', cors(), async function(req, res, next) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  
  User.findOne({email: email}).then(user => {
    if (user) {
      res.status(200).send({"err": "Email Address Already Exists", "field": "email"})
    } else {
      User.findOne({username: username}).then(async (user) => {
        if (user) {
          res.status(200).send({"err": "Username Already Exists", "field": "username"})
        } else {
          bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(req.body.password, salt, async function(err, hashedPassword) {
                  // Store hash in your password DB.
                  const newUser = new User({ email: email, username: username, password: hashedPassword});
                  
                  try {
                    await newUser.save()
                    res.status(200).send({"msg": "User Created"})
                  } catch (error) {
                    res.status(203).send({"err": 'Make sure all fields are filled'}); 
                  }
              });
          });
        }
      })
    }
  })
  
});

module.exports = router;

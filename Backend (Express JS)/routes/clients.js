var express = require('express');
const cors = require('cors')
const Client = require('../models/Client');
const MpesaPayment = require('../models/MpesaPayment');
const CardPayment = require('../models/CardPayment');
const OnlineConsultation = require('../models/OnlineConsultation');
const nodemailer = require("nodemailer");


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "mitchjaga@gmail.com",
    pass: "iuvl scsx ewpo apcs",
  },
});

const corsOptions = {
  origin: '*',
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

var router = express.Router();

router.options('*', cors(corsOptions))

router.get('/', cors(), async function(req, res, next) {
  try {
      const docs = await Client.find({}).sort({createdAt: -1})
      if (docs.length > 0) {
          
          res.status(200).send({"clients": docs})
      } else {
          
          res.status(200).send({"alert": "No Clients"})
          
      }
  } catch (error){
      
      res.status(203).send({"err": "Something went wrong"}) 
  }
});

router.get('/mpesa-payments', cors(), async function(req, res, next) {
  try {
      const docs = await MpesaPayment.find({}).sort({createdAt: -1})
      if (docs.length > 0) {
          
          res.status(200).send({"payments": docs})
      } else {
          
          res.status(200).send({"alert": "No Clients"})
          
      }
  } catch (error){
      
      res.status(203).send({"err": "Something went wrong"}) 
  }
});
router.get('/card-payments', cors(), async function(req, res, next) {
  try {
      const docs = await CardPayment.find({}).sort({createdAt: -1})
      if (docs.length > 0) {
          
          res.status(200).send({"payments": docs})
      } else {
          
          res.status(200).send({"alert": "No Clients"})
          
      }
  } catch (error){
      
      res.status(203).send({"err": "Something went wrong"}) 
  }
});

router.post('/add-client', cors(), async function(req, res, next) {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const route = req.body.route;
    const phone = req.body.phone;
    const tripDate = req.body.tripDate;

    
  
    const newClient = new Client({ email: email, fullName: fullName, route: route, phone: phone, tripDate: tripDate});
    
    try {
      await newClient.save()
      const info = await transporter.sendMail({
        from: 'mitchjaga@gmail.com', // sender address
        to: `${process.env.mail_to}`, // list of receivers
        subject: "Kilimanjaro Awaits, New Client", // Subject line // plain text body
        html: `<p>New Client: ${fullName}, Email: ${email}, Phone Number: ${phone}, Route: ${route}, Trip Date: ${tripDate}</p>`, // html body
      });

      res.status(200).send({"msg": "You have successfully booked your trip. We will conatct you via email or whatsApp about payment arrangements for your expedition"})

    } catch (error) {
      res.status(203).send({"err": 'Make sure all fields are filled'}); 
    }
    
    
    
});

router.options('/book-consultation', cors(corsOptions));
router.post('/book-consultation', cors(corsOptions), async function(req, res, next) {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const whatsApp = req.body.whatsApp;
  
    
    const newConsultation = new OnlineConsultation({ email: email, fullName: fullName, whatsApp: whatsApp});
    
    try {
      await newConsultation.save()
      const info = await transporter.sendMail({
        from: 'mitchjaga@gmail.com', // sender address
        to: `${process.env.mail_to}`, // list of receivers
        subject: "Kilimanjaro Awaits, Consultation Booked", // Subject line // plain text body
        html: `<p>Online Consultation Kilimanjaro: ${fullName}, Email: ${email}, WhatsApp Number: ${whatsApp}</p>`, // html body
      });
      res.status(200).send({"msg": "Online Consultation successfully booked. We will conatct you via email or whatsApp to schedule the zoom video call"})
      
    } catch (error) {
      throw error;
      res.status(203).send({"err": 'Make sure all fields are filled, and try again'}); 
    }
    
});

module.exports = router;
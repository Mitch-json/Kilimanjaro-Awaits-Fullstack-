var express = require('express');
const cors = require('cors')
const Client = require('../models/Client');
const MpesaPayment = require('../models/MpesaPayment');
const CardPayment = require('../models/CardPayment');
const axios = require('axios').default;
const stripe = require('stripe')("sk_test_51NTWnEByiuV0Sbl0my9qhodRHS9stGVKwVGpbyFZBIBAv6jVDX3xukadGMLG3FXnTWO6uBQlAFtnG4V8G4Ud4qNG00qu1HqZwx");


require('dotenv').config();

var router = express.Router();

router.options('*', cors())

const time_Stamp = require('./middleware.js')
let current_timestamp = time_Stamp.timeStamp;

router.post('/confirm-mpesa-code', cors(), (req, res)=>{
  const TransID = req.body.TransID
  let timeS = current_timestamp()
  MpesaPayment.findOne({TransID: TransID, TransTime :{$regex:`${timeS.slice(0,8)}`}}).then((payment) => {
    if (payment) {
      res.status(200).send({'confirmed': 'Payment Successful'})
    } else {
      res.status(200).send({'none': 'No Payment', 'code': TransID})
    }
  }).catch(error => {
    console.log(error)
    res.status(500).send({'ErrorDB': 'Database Error'})
  })
})

router.post('/TransactionStatus/queue', cors(), (req, res)=>{
  console.log(req.body)
})
router.post('/TransactionStatus/result', cors(), (req, res)=>{
  console.log(req.body)
})
router.post('/validation', cors(), (req, res)=>{
  console.log(req.body)
})

router.post('/confirmation', cors(), async function(req, res){
  const TransID = req.body.TransID
  const TransTime = req.body.TransTime
  const TransAmount = req.body.TransAmount
  const MSISDN = req.body.MSISDN

  console.log(req.body)
  
  const newMpesaPayment = new MpesaPayment({TransID: TransID, TransTime: TransTime, TransAmount: TransAmount, MSISDN: MSISDN})
  
  try {
    await newMpesaPayment.save()
    res.status(200)
  } catch (error) {
    console.log(error)
    res.status(500)
  }

})

router.post('/query-manual-payment', cors(), async function(req, res){
  const MSISDN = req.body.phone
  let timeS = current_timestamp()

  MpesaPayment.findOne({MSISDN: MSISDN, TransTime :{$regex:`${timeS.slice(0,8)}`}}).then((payment) => {
    if (payment) {
      res.status(200).send({'confirmed': 'Payment Successful'})
      
    } else {
      res.status(200).send({'none': 'No Payment'})
      
    }
  }).catch(error => {
    console.log(error)
    res.status(500).send({'ErrorDB': 'Database Error'})
  })
})

router.post('/query-payment', cors(), (req, res)=>{

  let buffer = new Buffer.from(process.env.consumer_key + ":"+ process.env.consumer_secret);
  let auth = `Basic ${buffer.toString('base64')}`;

  let CheckoutRequestID = req.body.CheckoutRequestID
  let timeS = current_timestamp()
  let bs_short_code = process.env.BS_SHORT_CODE
  let passkey = process.env.passkey

  let password = new Buffer.from(`${bs_short_code}${passkey}${timeS}`).toString('base64');

  axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",{
    "headers":{
        "Authorization":auth
    }
  }).then(data => {
      let authTokenHeader=`Bearer ${data.data.access_token}`;
      axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query", {
          "BusinessShortCode": bs_short_code,
          "Password": password,
          "Timestamp": timeS,
          "CheckoutRequestID": CheckoutRequestID
      }, {"headers" : {
        'Authorization': authTokenHeader
      }})
      .then(result => {
        res.status(200).send({"QueryResponse": result.data})
      })
      .catch(error => {
        res.status(500).send({"errorMessage": error.response.data.errorMessage})
      });
  }).catch(err=>{
    res.status(err.response.status).send({"errorMessageOAUTH": err.response.statusText})
  })

})

router.post('/STK-PUSH/notifications', cors(), async function(req, res){
  if (req.body.Body.stkCallback.ResultCode === 0) {
    const TransID = req.body.Body.stkCallback.CallbackMetadata.Item[1].Value
    const TransTime = req.body.Body.stkCallback.CallbackMetadata.Item[3].Value
    const TransAmount = req.body.Body.stkCallback.CallbackMetadata.Item[0].Value
    const MSISDN = req.body.Body.stkCallback.CallbackMetadata.Item[4].Value
    
    const newMpesaPayment = new MpesaPayment({TransID: TransID, TransTime: TransTime, TransAmount: TransAmount, MSISDN: MSISDN})
    
    try {
      await newMpesaPayment.save()
      res.status(200)
    } catch (error) {
      console.log(error)
      res.status(500)
    }
  } else {
    console.log(req.body.Body.stkCallback.ResultDesc)
  }
  
  res.status(200)
})

router.post('/STK-PUSH', cors(), (req, res)=>{

  let buffer = new Buffer.from(process.env.consumer_key + ":"+ process.env.consumer_secret);
  let auth = `Basic ${buffer.toString('base64')}`;
  
  let timeS = current_timestamp()
  let bs_short_code = process.env.BS_SHORT_CODE
  let passkey = process.env.passkey

  let password = new Buffer.from(`${bs_short_code}${passkey}${timeS}`).toString('base64');
  let amount = "1"; 
  let phoneNumber = req.body.phone 

 
  axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",{
    "headers":{
        "Authorization":auth
    }
  }).then(data => {
      let authTokenHeader=`Bearer ${data.data.access_token}`;
      
      axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
          "BusinessShortCode": bs_short_code,
          "Password": password,
          "Timestamp": timeS,
          "TransactionType": "CustomerPayBillOnline",
          "Amount": 1,
          "PartyA": phoneNumber,
          "PartyB": bs_short_code,
          "PhoneNumber": phoneNumber,
          "CallBackURL": `${process.env.BACKEND_URL}/STK-PUSH/notifications`,
          "AccountReference": "ASPIRE AGENCIES",
          "TransactionDesc": `Payment of ${amount}` 
      }, {"headers" : {
        'Authorization': authTokenHeader
      }})
      .then(result => {
        res.status(200).send({"CheckoutRequestID": result.data.CheckoutRequestID})
      })
      .catch(error => {
        res.status(500).send({"errorMessage": error.response.data.errorMessage})
      });
  }).catch(err=>{
    res.status(err.response.status).send({"errorMessage": err.response.statusText})
  })
})

router.post('/payment/stripe', cors(), async (req, res, next)=>{
  const token = req.body.token
  const amount = req.body.amount
  const route = req.body.route
  const email = token.email

  stripe.customers.create({
    email: token.email,
    source: token.id, 
  },
  {
    maxNetworkRetries: 5,
  })
    .then(customer => {
      return stripe.charges.create({
          amount: amount*100,     // Charging Rs 25
          description: route,
          currency: 'USD',
          customer: customer.id
      });
      
    })
    .then(async (charge) => {
      const newCardPayment = new CardPayment({paymentID: charge.id ,customerID: charge.customer ,receiptURL: charge.receipt_url ,email: charge.billing_details.name})
      try {
        await newCardPayment.save()
      } catch (error) {
        console.log(error)
      }

      res.status(201).send({ "success": "Payment Successful", "receipt": charge.receipt_url });
    })
    .catch(error => {
      console.error(error)
      res.status(500).send({ "fail": "Payment Failed" });
    });

})




module.exports = router;

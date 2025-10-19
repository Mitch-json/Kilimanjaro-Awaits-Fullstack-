var express = require('express');
const cors = require('cors');
const TripDate = require('../models/TripDate');


var router = express.Router();

router.options('*', cors())

router.get('/', cors(), async function (req, res){
    try {
        const docs = await TripDate.find({}).sort({createdAt: -1})
        if (docs.length > 0) {
            
            res.status(200).send({"dates": docs})
        } else {
            
            res.status(200).send({"alert": "No upcoming trips"})
            
        }
    } catch (error){
        
        res.status(203).send({"err": "Something went wrong"}) 
    }
})
router.get('/:route', cors(), async function (req, res){
    const route = req.params.route
    try {
        const docs = await TripDate.find({route: route}).sort({createdAt: -1})
        if (docs.length > 0) {
            
            res.status(200).send({"dates": docs})
        } else {
            
            res.status(200).send({"alert": "No upcoming trips"})
            
        }
    } catch (error){
        console.log(error)
        res.status(203).send({"err": "Something went wrong"}) 
    }
})

router.get('/delete-trip-date/:date_id', cors(), async function(req, res, next) {
    const date_id = req.params.date_id
  
    try {
      await TripDate.deleteOne({ _id: date_id });
      
    } catch (error){
      res.status(203).send({"err": "Something went wrong"}) 
    }
  
    res.status(200).send({"msg": "Trip Date Deleted"})
});

router.post('/add-trip-date', cors(), async function (req, res){
    const date = req.body.date
    const route = req.body.route

    const newTripDate = new TripDate({ date: date, route: route});
    
    try {
      await newTripDate.save()
      res.status(200).send({"msg": 'Trip Date added'}); 
    } catch (error) {
      res.status(500).send({"err": 'Make sure all fields are filled'}); 
    }
})

router.post('/edit-trip-date', cors(), async (req, res, next)=>{
    const dateID = req.body.dateID
    const date = req.body.date
    const route = req.body.route
    
    try {
        const doc = await TripDate.findOneAndUpdate({_id: dateID}, { date: date, route: route}, {
          new: true
        });
        
        
        res.status(200).send({"msg": "Trip Date Updated"})
    } catch (error) {
        
        res.status(203).send({"err": 'Make sure all fields are filled'}); 
    }
    
})


module.exports = router;
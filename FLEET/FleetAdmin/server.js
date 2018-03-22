var express = require('express'),
        app = express(),
        engines = require('consolidate'),
        MongoClient = require('mongodb').MongoClient,
        assert = require('assert'),
        bodyparser = require('body-parser'),
        path = require('path'),
        url = "mongodb://localhost:27017/";

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        res.status(200).send('Allow');
    } else {
        next();
    }
});


MongoClient.connect(url, function (err, db) {
    if (err)
        throw err;
    let dbo = db.db("fleet");
    app.get('/login', function (req, res) {
        var query = {username: req.query.admin};
        dbo.collection("admin").find(query).toArray(function (err, result) {
            if (err)
                throw err;
            if (result.length > 0)
            {
                res.status(200).json({message: "success"}); 
            } else
            {
                 res.status(200).json({message: "fail"}); 
            }
            
        });
    });
    
    app.use(bodyparser.json());
   
   app.get('/addRoutes', function (req, res) {
        dbo.collection("routes").find({}).toArray(function (err, result) {
            if (err)
                throw err;
            console.log(result);
            res.send("success");
            //db.close();
        });
    });
	
    app.get('/addTrips', function (req, res) {
		dbo.collection("vehicle").find({},{vehicleId:1}).toArray(function(e
        dbo.collection("trips").find({},{routeId:1,vehicleId:1}).toArray(function (err, result) {
            if (err)
                throw err;
            console.log("routeId and vehicle number is fetched");
			
            //db.close();
        });
    });

    app.post('/addTrips', function (req, res) {
        dbo.collection("trips").insertOne(req.body, function (err, result) {
            if (err)
                throw err;
            console.log("Inserted trips detail");
            //db.close();
        });
    });

    app.post('/addDevice', function (req, res) {
        dbo.collection("device").insertOne(req.body, function (err, result) {
            if (err)
                throw err;
            console.log('Vehicle details inseretred');
            //kdb.close();
        });
    });
    
    app.get('/viewTrips',function(req,res){
        dbo.collection("trips").find({}).toArray(function(err,result){
            if(err)
                throw err;
            console.log(result)
            res.send("Successfully retrieved");
        });
    });
   app.get('/ReassignTrips',function(req,res){
       dbo.collection("trips").find({},{tripId :1,vehicleId:1}).toArray(function(err,result){
           if(err)
                throw err;
            console.log(result);
            res.send("Successfully Retrieved");
               });
   });
    app.post('/ReassignTrips',function(req,res){
       var tripId = { tripId: "12345" };
       var vehicleId = { $set: { vehicleId:"Mu-1234" } };
       //This could be 
       //var tripId={tripId:req.body.tripId};
      // var vehicleId={vehicleId:req.body.vehicleId};
       dbo.collection("trips").updateOne(tripId,vehicleId,function(err,result){
       if(err)
            throw err;
        console.log("Document updated");
            res.send('Successfully updated');
         });
       });
       
     
    app.use(function (req, res) {
        res.sendStatus(404);
    });

    var server = app.listen(3000, function () {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });
});

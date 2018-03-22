var express = require('express'),
app = express(),
//engines = require('consolidate'),
MongoClient = require('mongodb').MongoClient,
assert = require('assert'),
bodyparser=require('body-parser'),
path=require('path'),
url="mongodb://localhost:27017/";


MongoClient.connect(url,function(err,db){
	if(err)throw err;
	let dbo=db.db("fleet");
	app.get('/login', function(req,res){
		var query={username:req.query.admin};
		dbo.collection("admin").find(query).toArray(function(err,result){
			if(err) throw err;
			if(result.length>0)
			{
				res.json({status:"success"});
			}
			else
			{
				res.json({status:"fail"});
			}
			db.close();
		});
	});
	
	app.use(bodyparser.json());

	app.post('/addRoutes',function(req,res){
		dbo.collection("routes").insertOne(req.body,function(err,result){
			if(err) throw err;
			console.log("document inserted");
			db.close();
		});	
	});
		
	app.post('/addTrips',function(req,res){
		dbo.collection("trips").insertOne(req.body,function(err,result){
			if(err)throw err;
			console.log("Inserted trips detail");
			db.close();
		});
	});
		
	app.post('/addDevice',function(req,res){
		dbo.collection("device").insertOne(req.body,function(err,result){
			if(err) throw err;
			console.log('Vehicle details inseretred');
			db.close();
		});
	});

	app.get('/viewTrips',function(req,res){
		dbo.collection("trips").find({}).toArray(function(err,result){
		if(err) throw err;
		console.log(result)
		db.close();
		});
	});
	

	app.use(function(req, res){
        res.sendStatus(404);
    });
 
    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });
});
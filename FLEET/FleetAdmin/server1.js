var express=require('express'),
app=express(),
MongoClient=require('mongodb').MongoClient,
assert=require('assert');
let url="mongodb://localhost:27017/";

MongoClient.connect(url,function(err,db){
	if(err) throw err;
	let dbo=db.db('dummy');
	app.get('/',function(req,res){
		dbo.collection('testdata').find({}).toArray(function(err,result){
			console.log(result);
			//res.send(result.stringify());
			//res.send('fetching data');
			res.json(result);
			db.close();
		});
	});
	app.use(function(req,res)
	{
		res.sendStatus(404);
	
});
 var server=app.listen(3000,function(){
	 var port=server.address().port;
	 console.log('port is',port);
 });
});

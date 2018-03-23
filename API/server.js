let express=require('express');
let app = express();
let sql = require('mssql');

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
let config={
	userName:"*****",
	password:"*****",
	server:"*****",
	options:{
		database:"*****",
		encrypt:true
	}
};

var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) 
   {
   	console.log("here");
     if (err) 
       {
          console.log(err)
       }
    /*else
       {
           queryDatabase()
       }*/
   }
 );

app.get('/',function(req,res){
	queryDatabase(req,res);
});
 function queryDatabase(req,res)
   { console.log('Reading rows from the Table...');

   		let data="{";
       // Read all rows from table
     request = new Request(
          "SELECT * from connectedhomeEnvironment1",
             function(err, rowCount, rows) 
                {
                	data+="}";
                    console.log(data);
                    //process.exit();
                }
            );
 
     request.on('row', function(columns) {
     	console.log(columns);
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
            data+="\""+column.metadata.colName+"\":\""+column.value+"\",";
         });
             });
     connection.execSql(request);
     console.log("end");
   }

/*app.get('/',function(req,res){
	sql.connect(config,function(err){
		if(err)console.log(err);
		let request=new sql.Request();
		request.query('select * from connectedhomeEnvironment1',function(err,recordset){
			if(err)console.log(err);
			res.send(recordset);
		});
	});
});*/

let server=app.listen(3000,function(){
	console.log("server running");
});
const request = require('request');
const cheerio = require('cheerio');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

request('http://www.torrenttrackerlist.com/torrent-tracker-list',(err,res,html)=>{
	if(!err && res.statusCode == 200) {
		const $ = cheerio.load(html);

		var pText=$('.prettyprint').text()
		pText=pText.split("\n\n")
		var set={
			data : pText,
			created : Date.now(),
			updated : Date.now()
		}
		 MongoClient.connect(url,{ useUnifiedTopology :true},(err,db)=>{
		 	if(err) throw err;
		 	var dbo = db.db("Temp");
		 	dbo.collection("Common").updateOne({ dataType : "scraper" },{$set:set}, {upsert : true}, (err,res)=>{
		 		if(err) throw err;
		 		console.log("Successful..");
		 		db.close();
		 	})
		 })
	}
})

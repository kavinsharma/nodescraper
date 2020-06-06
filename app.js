var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const express = require('express');
const app = express();

app.get('/',(req,res)=>{
	MongoClient.connect(url, {useUnifiedTopology: true},(err, db)=> {
  if (err) throw err;
  var dbo = db.db("Temp");
  dbo.collection("Common").find({ dataType : "scraper" },{ projection: { data: 1,updated:1} }).toArray((err, result)=> {
    if (err) throw err;
    res.send({
     result
    })
    db.close();
  });
});
}
);

app.listen(5000,()=>{
	console.log('API STARTED');
})
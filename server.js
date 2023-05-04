var express = require('express');
const { writeFileSync } = require("fs");
const bodyParser = require("body-parser");
var app = express();
var cors = require('cors')
// var image = require("./image.json");
// var image = require("./image(background).json");
var image = require("./image1.json")

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

app.get('/feed-image', function(req, res){
   return res.json(image);
});
app.get('/feed-image/:id', function(req, res){
   return res.json(image['feed-image'][req.params.id]);
});
app.post('/feed-image/edit/:id', function(req, res){
   image['feed-image'][req.params.id] = req.body.data;
   const path = "./image.json";
   try {
       writeFileSync(path, JSON.stringify(image, null, 2), "utf8");
       return res.json("Data successfully saved");
   } catch (error) {
      return res.json("An error has occurred ", error);
   }
});
app.post('/feed-image/create', function(req, res){
   console.log("create")
   image1['feed-image'].push(req.body.data);
   const path = "./image1.json";     
   try {
       writeFileSync(path, JSON.stringify(image, null, 2), "utf8");
       return res.json("Data successfully saved");
   } catch (error) {
      return res.json("An error has occurred ", error);
   }
});
app.listen(3000);
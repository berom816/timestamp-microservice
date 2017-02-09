var express = require("express");
var app = express();
var http = require("http");
var url = require("url");

var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function convertUnix(input){
  var holdO = {};
  holdO.unix = input;
  var d = new Date(input*1000);
  holdO.natural = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  return holdO;
}

function convertHuman(input2){
  var holdObj = {};
  var alterInput = input2.replace(/%20/g,' ');
  var enterDate = Date.parse(alterInput);
  if(Number.isNaN(enterDate)){
    holdObj.unix = null;
    holdObj.natural = null;
  }
  else{
    holdObj.unix = enterDate;
    var secondDate = new Date(enterDate);
    holdObj.natural = months[secondDate.getMonth()] + ' ' + secondDate.getDate() + ', ' + secondDate.getFullYear();
  }
  return holdObj;
}


// console.log(convertHuman('January 2, 2001'));

//var holdPath = '';
app.use(function(req,res,next){
  var holdUrl = url.parse(req.url,true);
  if(req.url==='/'){
    res.end('Example usage:\nhttps://timestamp-ms.herokuapp.com/December%2015,%202015\nhttps://timestamp-ms.herokuapp.com/1450137600\nExample output:\n' + '{\"unix\": 1450137600, \"natural\": \"December 15, 2015\"}');
  }
  else{
    var holdPath = holdUrl.pathname;
    holdPath = holdPath.substring(1,holdPath.length);
    var holdPathConvert = Number(holdPath);
    if(Number.isNaN(holdPathConvert)){
      res.end(JSON.stringify(convertHuman(holdPath)));
    }
    else{
      res.end(JSON.stringify(convertUnix(holdPathConvert)));
    }
  }
});

app.listen(8080,'0.0.0.0');


//require('babel/register');

var System = require('es6-module-loader').System;

System.import('./main.js').then(function(index) {
  //  index.run(__dirname);
}).catch(function(err){
    console.log('err', err);
});

//var app = require("./app.js");

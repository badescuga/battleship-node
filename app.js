'use strict';
require('babel/register')({
  optional: ["es7.asyncFunctions"]
});
var app = require("./main.js");

//var System = require('es6-module-loader').System;

// System.import('./main.js').then(function (index) {
//   //  index.run(__dirname);
// }).catch(function (err) {
//   console.log('err', err);
// });



// var path = require('path')
//   , fs = require('fs')
//   , browserify = require('browserify')
//   , es6ify = require('es6ify')
  //, jsRoot = path.join(__dirname, 'public', 'js')
  //, bundlePath = path.join(jsRoot, 'bundle.js')
  ;

// es6ify.traceurOverrides = { asyncFunctions: true }

// browserify({ debug: true })
//   .add(es6ify.runtime)
//   .transform(es6ify)
 // .require(require.resolve('./main.js'), { entry: true })
  //.bundle()
  //.on('error', function (err) { console.error(err); })
  //.pipe(fs.createWriteStream(bundlePath));
  //var main = require("./main.js");
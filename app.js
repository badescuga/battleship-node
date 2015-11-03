'use strict';
require('babel/register')({
  optional: ['es7.asyncFunctions']
});
var app = require('./main.js');

//var System = require('es6-module-loader').System;

// System.import('./main.js').then(function (index) {
//   //  index.run(__dirname);
// }).catch(function (err) {
//   console.log('err', err);
// });

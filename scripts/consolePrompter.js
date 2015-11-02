var prompt = require('prompt');
import {Point, Converter} from "./utils.js";
 
// 
// Start the prompt 
// 
prompt.start();
 
// 
// Get two properties from the user: username and email 
// 
 

var promptAddShipPromise = function () {
  return new Promise(function (resolve, reject) {
    prompt.get(['position'], function (err, result) {

      if (err) {
        reject(err);
      } else {
        resolve(result.position);
      }

      //   console.log('Command-line input received:');
      //  console.log('  position: ' + result.position);

    });
  });
}

var promptAddShipAsync = async function() {
  var data = null;
  try {
    data = await promptAddShipPromise();
    // console.log("data untraslated: " + data);
    var point = Converter.ToBattleshipCoord(data);
    if (point != null) {
    //  console.log("data translated: " + point.ToString());
      return point;
    }

  } catch (error) {
    console.log("--- " + error);
  }

  return null;
}

module.exports = {
  promptAddShipAsync: promptAddShipAsync
}
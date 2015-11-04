import {Point, Converter} from './utils.js';
import prompt from 'prompt'; 
// 
// Start the prompt 
// 
prompt.start();
 
// 
// Get two properties from the user: username and email 
// 
 

var promptAddPositionPromise = function () {
  return new Promise(function (resolve, reject) {
    prompt.get(['position'], function (err, result) {

      if (err) {
        reject(err);
      } else {
        if(result.position === "quit") {
          process.exit(); // exit app if you type "quit"
        }
        resolve(result.position);
      }

      //   console.log('Command-line input received:');
      //  console.log('  position: ' + result.position);

    });
  });
}

var promptAddPositionAsync = async function() {
  var data = null;
  try {
    data = await promptAddPositionPromise();
    // console.log('data untraslated: ' + data);
    var point = Converter.ToBattleshipCoord(data);
    if (point != null) {
    //  console.log('data translated: ' + point.ToString());
      return point;
    }

  } catch (error) {
    console.log('--- ' + error);
  }

  return null;
}


module.exports = {
  promptAddPositionAsync: promptAddPositionAsync
}
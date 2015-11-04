import {TileType} from './battlefield.js';
import {Point, Converter} from './utils.js';

class EnemyAI {
	constructor() {

	}

//this could be improved. For example, once i do hit a ship i know that 
//around that point there is likely some other points of the ship to be
//hit. Another improvement would be to search smart around the map; for 
//example, parse all columns and search from 4 to 4 tiles (i.e. the 
//smallest ship is size 4 in this example) and so on.
	static GetHittablePosition(oponentBattlefield) {
		
		//return new Point(1,1); //hack for debug
		//console.log('Getting hittable position..'+oponentBattlefield.sizeX+ ' ' + oponentBattlefield.sizeY);
		var notHitFields = [];

		for (var i = 1; i <= oponentBattlefield.sizeX; i++) {
			for (var j = 1; j <= oponentBattlefield.sizeY; j++) {
				if (oponentBattlefield.array[i][j] !== TileType.Hit) {
					//		console.log('PUSHING '+i+' '+j+ ' ' + oponentBattlefield.array[i][j]);
					notHitFields.push({ 'x': i, 'y': j });
				}
			}
		}
		//console.log('ENEMY SEES NO. OF NOT HIT TARGETS: ' + notHitFields.length);
		if (notHitFields.length > 0) {
			var randPos = Math.floor(Math.random() * notHitFields.length);
			return new Point(notHitFields[randPos].x, notHitFields[randPos].y);
		}
		return null;
	}

	static EnemyStrike(oponentBattlefield) {
		console.log('==>>>> enemy\'s turn =========>>>>>>');
		var point = EnemyAI.GetHittablePosition(oponentBattlefield); // get rand not hitted point
		if (point !== null) {
			//console.log('ENEMY GOT POINT: '+point.ToString());
			var shipHitted = oponentBattlefield.Hit(point);
			if (shipHitted) {
				console.log('!!!! your ship was hitted by enemy at ' + Converter.ToDisplayCoord(point));
				if (oponentBattlefield.CheckIfShipsLeft() === false) {
					console.log('!!!!!!!!!!!!!!!!!!!! You\'ve lost :(( !!! ');
					return null;
				}
				return true;
			} else {
				console.log('your enemy missed at ' + Converter.ToDisplayCoord(point));
			}
		} else { //this will/should never happen
			console.log('END OF GAME -- no more points to hit');
			return null;
		}
		return false;
	}

}
export {EnemyAI};
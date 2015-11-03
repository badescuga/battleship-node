import {TileType} from "./battlefield.js";
import {Point} from "./utils.js";

class EnemyAI {
	constructor() {

	}

	static GetHittablePosition(oponentBattlefield) {
		
		//console.log("Getting hittable position.."+oponentBattlefield.sizeX+ " " + oponentBattlefield.sizeY);
		var notHitFields = [];

		for (var i = 1; i <= oponentBattlefield.sizeX; i++) {
			for (var j = 1; j <= oponentBattlefield.sizeY; j++) {
				if (oponentBattlefield.array[i][j] !== TileType.Hit) {
					//		console.log("PUSHING "+i+" "+j+ " " + oponentBattlefield.array[i][j]);
					notHitFields.push({ "x": i, "y": j });
				}
			}
		}
		//console.log("ENEMY SEES NO. OF NOT HIT TARGETS: " + notHitFields.length);
		if (notHitFields.length > 0) {
			var randPos = Math.floor(Math.random() * notHitFields.length);
			return new Point(notHitFields[randPos].x, notHitFields[randPos].y);
		}
		return null;
	}

	static EnemyStrike(oponentBattlefield) {
		console.log("==>>>> enemy's turn =========>>>>>>");
		var point = EnemyAI.GetHittablePosition(oponentBattlefield); // get rand not hitted point
		if (point !== null) {
			//console.log("ENEMY GOT POINT: "+point.ToString());
			var shipHitted = oponentBattlefield.Hit(point);
			if (shipHitted) {
				console.log("!!!! your ship was hitted by enemy at point:" + point.ToString());
				if (this.enemyBattlefield.CheckIfShipsLeft() === false) {
					console.log("!!!!!!!!!!!!!!!!!!!! You've lost :(( !!! ");
					return null;
				}
				return true;
			} else {
				console.log("your enemy missed at point:" + point.ToString());
			}
		} else { //this will/should never happen
			console.log("END OF GAME -- no more points to hit");
			return null;
		}
		return false;
	}

}
export {EnemyAI};
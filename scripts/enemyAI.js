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
				if (oponentBattlefield.array[i][j] !== TileType.Hit) 
				{
			//		console.log("PUSHING "+i+" "+j+ " " + oponentBattlefield.array[i][j]);
					notHitFields.push({ "x": i, "y": j });
				}
			}
		}
		console.log("ENEMY SEES NO. OF NOT HIT TARGETS: " + notHitFields.length);
		if (notHitFields.length > 0) {
			var randPos = Math.floor(Math.random() * notHitFields.length);
			return new Point(notHitFields[randPos].x, notHitFields[randPos].y);
		}
		return null;
	}

}
export {EnemyAI};
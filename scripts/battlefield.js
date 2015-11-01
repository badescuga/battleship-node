/*###########################################

 

###########################################*/

import {Ship, Battleship, Destroyer } from "./ships.js";
import {Point} from "./utils.js";
var TileType = {
	Empty: 0,
	Occupied: 1,
	Hit: 2
}

class Battlefield {
	constructor() {
		this.sizeX = 10;
		this.sizeY = 10;
		this.array = this.CreateEmptyField(this.sizeX, this.sizeY);
	}

	CreateEmptyField(x, y) {
		var arr = [];
		for (var i = 1; i <= x; i++) {
			arr[i] = [];
			for (var j = 1; j <= y; j++) {
				arr[i][j] = TileType.Empty;
			}
		}
		return arr;
	}

	CanAddShip(ship) {
		if (ship.size > 0) {
			var head = ship.headPoint;
			var tail = new Point(head.x, head.y + ship.size - 1); // wrote explicity for clarity
			var arr = [head, tail];

			var pointsAreInsideArray = true;
			for (var point in arr) { //check if head and tail are inside battlefield
				if (this.IsPointInnerMap(point) === false) {
					pointsAreInsideArray = false;
					console.log(point.ToString() + "; ship is outside of battlefield");
				}
			}

			if (pointsAreInsideArray) { //check if space is empty (and ship can be added) or not
				var spaceIsEmpty = true;
				for (var i = head.y; i <= tail.y; i++) {
					if (this.array[head.x][i] != TileType.Empty) {
						spaceIsEmpty = false;
					}
				}
				if (spaceIsEmpty) {
					return true;
				} else {
					console.log("the ship overlaps with occupied terrain");
				}
			}
		}
		return false;
	}

	AddShip(ship) {
		var canAddShip = this.CanAddShip(ship);
		if (canAddShip) {
			for (var i = ship.headPoint.y; i < ship.headPoint.y + ship.size; i++) {
				this.array[ship.headPoint.x][i] = TileType.Occupied;
			}
		}
		return canAddShip;
	}

	IsPointInnerMap(point) { // is the point internal to the map
		if (point.x <= 0 || point.x > this.sizeX || point.y <= 0 || point.y > this.sizeY) {
			return false;
		}
		return true;
	}

	Hit(point) { //hit
		if(this.array[point.x][point.y] === TileType.Empty) {
			this.array[point.x][point.y] = TileType.Hit;
			return true;
		}
		return false;
	}
}

export { Battlefield };


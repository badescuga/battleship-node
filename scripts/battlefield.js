/*###########################################

 

###########################################*/

import {Point} from './utils.js';

var TileType = {
	Empty: 0,
	Occupied: 1,
	Hit: 2
}

class Battlefield {
	constructor() {
		this.sizeX = 10;
		this.sizeY = 10;
		this.array = this._CreateEmptyField(this.sizeX, this.sizeY);
	}

	_CreateEmptyField(x, y) {

		var arr = [];
		arr.push([]); //empty array b/c i'm starting from 1

		for (var i = 1; i <= x; i++) {
			arr.push([]);
			arr[i].push(new Array(y));

			for (var j = 1; j <= y; j++) {
				arr[i][j] = TileType.Empty;
			}
		}

		return arr;
	}

	_CanAddShip(ship, showErrorMessage) {
		if (ship.size > 0) {
			var head = ship.headPoint;
			var tail = new Point(head.x + ship.size - 1, head.y); // wrote explicity for clarity
			var ptsArray = [head, tail];
			var pointsAreInsideArray = true;
			for (var i = 0; i < 2; i++) { //check if head and tail are inside battlefield
				var point = ptsArray[i];
				if (this.IsPointInnerMap(point) === false) {
					pointsAreInsideArray = false;
					if (showErrorMessage) {
						console.log(point.ToString() + '; ERROR: ship is outside of battlefield');
					}
				}
			}

			if (pointsAreInsideArray) { //check if space is empty (and ship can be added) or not
				var spaceIsEmpty = true;
				for (var ii = head.x; ii <= tail.x; ii++) {
					if (this.array[ii][head.y] != TileType.Empty) {
						spaceIsEmpty = false;
					}
				}
				if (spaceIsEmpty) {
					return true;
				} else {
					if (showErrorMessage) {
						console.log('the ship overlaps with occupied space');
					}
				}
			}
		} else {
			if (showErrorMessage) {
				console.log('ERROR: ship size: ' + ship.size);
			}
		}
		return false;
	}

	AddShip(ship, showErrorMessage) {

		var canAddShip = this._CanAddShip(ship, showErrorMessage);
		if (canAddShip) {
			for (var i = ship.headPoint.x; i < ship.headPoint.x + ship.size; i++) {
				this.array[i][ship.headPoint.y] = TileType.Occupied;
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

	AlreadyHit(point) {
		if (this.array[point.x][point.y] === TileType.Hit) {
			return true;
		}
		return false;
	}
	Hit(point) { //hit
		if (this.array[point.x][point.y] === TileType.Occupied) {
			this.array[point.x][point.y] = TileType.Hit;
			return true; // has hit ship
		}
		this.array[point.x][point.y] = TileType.Hit;
		return false; //hasn't hit ship
	}

	CheckIfShipsLeft() {
		for (var i = 1; i <= this.sizeX; i++) {
			for (var j = 1; j <= this.sizeY; j++) {
				if(this.array[i][j] === TileType.Occupied) {
					return true;
				}
			}
		}
		return false;
	}

	Print(showShips) {
		if (this.array) {
			process.stdout.write('  ');
			for (var q = 0; q < this.sizeY; q++) { // print headers
				process.stdout.write(q + ' ');
			}

			process.stdout.write('\n');
			for (var i = 1; i <= this.sizeX; i++) {

				process.stdout.write(String.fromCharCode(i + 65 - 1));
				for (var j = 1; j <= this.sizeY; j++) {
					if (!showShips && this.array[i][j] === TileType.Occupied) {
						process.stdout.write(' ' + TileType.Empty);
					} else {
						process.stdout.write(' ' + this.array[i][j]);
					}
				}
				process.stdout.write('\n');
			}
		} else {
			console.log('array is null');
		}
	}


}

export { Battlefield, TileType };


import {Ship, Battleship, Destroyer } from "./ships.js";

class Battlefield {
	constructor() {
		this.array = this.CreateEmptyField(10, 10);
	}

	CreateEmptyField(x, y) {
		var arr = [];

		for (var i = 0; i < x; i++) {
			arr[i] = [];
			for (var j = 0; j < y; j++) {
				arr[i][j] = 0;
			}
		}
		return arr;
	}
	
	
}

export { Battlefield };


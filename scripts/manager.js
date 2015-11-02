import {Battlefield} from "./battlefield.js";
import {Ship, Battleship, Destroyer } from "./ships.js";
var consolePrompter = require("./consolePrompter.js");

class Manager {
	constructor() {
		this.Init();

	}

	Init() {
		this.playerBattlefield = new Battlefield();
		this.enemyBattlefield = new Battlefield();

		this.AddEnemyShips();
		this.AddPlayerShips();
	}


	AddEnemyShips() {
		//adding computer ships
		var addedShips = 0;
		while (addedShips < 3) {
			var randX = Math.floor((Math.random() * this.enemyBattlefield.sizeX) + 1)
			var randY = Math.floor((Math.random() * this.enemyBattlefield.sizeY) + 1)
			var ship = null;
			if (addedShips === 0) {
				ship = new Battleship(randX, randY);
			} else {
				ship = new Destroyer(randX, randY);
			}
			var shipWasAdded = this.enemyBattlefield.AddShip(ship, false);
			if (shipWasAdded) {
				addedShips++;
				console.log("enemy ship added!");
			} else {
				//	console.log("problem adding ship, will try again with new coords");
			}
		}
	}

	async AddPlayerShips() {
		
	var addedShipsNr = 0;
	while (addedShipsNr < 3) {
		console.log("");
		if (addedShipsNr < 2) {
			console.log("adding destroyer (size 1x4)");
		} else {
			console.log("adding battleship (size 1x5)");
		}
		var point = await consolePrompter.promptAddShipAsync();
		var ship = null;
		if (point) {
			if (addedShipsNr < 2) {
				ship = new Destroyer(point.x, point.y);
			} else {
				ship = new Battleship(point.x, point.y);
			}
			var hasAddedShip = this.playerBattlefield.AddShip(ship, true);
			if (hasAddedShip) {
				addedShipsNr++;
				console.log("SHIP ADDED");
				console.log("");
			}
		} else {
			console.log("data added is not correct; try again");
		}

	}
}

}

export {Manager}

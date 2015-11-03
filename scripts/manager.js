import {Battlefield} from "./battlefield.js";
import {Ship, Battleship, Destroyer } from "./ships.js";
var consolePrompter = require("./consolePrompter.js");

class Manager {
	constructor() {
		this.Init();

	}

	async Init() {
	this.InitEnemy(); 	//add enemy
	await this.InitPlayer();	//add for user
}


InitEnemy() {
	//init array
	this.enemyBattlefield = new Battlefield();
	//adding computer ships
	console.log("");
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

async InitPlayer() {
	//init array
	this.playerBattlefield = new Battlefield();

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
				console.log("SHIP ADDED; YOUR BATTLEFIELD: ");
				console.log("");
				this.playerBattlefield.Print(true);
			}
		} else {
			console.log("data added is not correct; try again");
		}

	}
	console.log("");
}

}

export {Manager}

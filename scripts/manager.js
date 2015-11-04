/*========================================================
console battlefield against the computer. 

-you have 3 ships you can add. 2 destoyers (sized 1x4) and
1 battleship (sized 1x5)
-input is to be added in a 2 value format: [A-J][0-9]. 
-details regarding battlefield map: 
	0 - Empty / 1 - Occupied(Ship) / 2 - Hit
-once you hit an enemy ship, you get another shot.
 ========================================================*/


import {Battlefield} from './battlefield.js';
import {Battleship, Destroyer } from './ships.js';
import {EnemyAI} from './enemyAI.js';
import {Converter} from './utils.js';
var consolePrompter = require('./consolePrompter.js');


class Manager {
	constructor() {
		this.Init();
	}

	async Init() {
	this.InitEnemy(); 	//add enemy
	await this.InitPlayer();	//add for user
	this.StartGame();
}


InitEnemy() {
	console.log('start loading enemy..');
	//init array
	this.enemyBattlefield = new Battlefield();
	//adding computer ships
	console.log('');
	var addedShips = 0;
	while (addedShips < 3) {
		var randX = Math.floor((Math.random() * this.enemyBattlefield.sizeX) + 1);
		var randY = Math.floor((Math.random() * this.enemyBattlefield.sizeY) + 1);
		var ship = null;
		if (addedShips === 0) {
			ship = new Battleship(randX, randY);
		} else {
			ship = new Destroyer(randX, randY);
		}
		var shipWasAdded = this.enemyBattlefield.AddShip(ship, false);
		if (shipWasAdded) {
			addedShips++;
			console.log('enemy ship added!');
		} else {
			//	console.log('problem adding ship, will try again with new coords');
		}
	}
}

async InitPlayer() {
	console.log('\nstart loading player..');
	//init array
	this.playerBattlefield = new Battlefield();
	var addedShipsNr = 0;
	while (addedShipsNr < 3) {
		console.log('');
		if (addedShipsNr < 2) {
			console.log('adding destroyer (size 1x4)');
		} else {
			console.log('adding battleship (size 1x5)');
		}

		var point = null;
		try {
			point = await consolePrompter.promptAddPositionAsync();
		} catch (error) {
			console.log('ERROR: ' + error);
		}
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
				console.log('SHIP ADDED; YOUR BATTLEFIELD: ');
				console.log('');
				this.playerBattlefield.Print(true);
			}
		} else {
			console.log('data added is not correct; try again');
		}
	}
	console.log('');
}

async PlayerStrike() {
	console.log('==>>>> your turn =========>>>>>>');
	var point = null;
	do {
		try {
			point = await consolePrompter.promptAddPositionAsync();
		} catch (error) {
			console.log('ERROR: ' + error);
		}
		if (point === null) {
			console.log('point not correct; please try again')
		} else if (this.enemyBattlefield.AlreadyHit(point)) {
			console.log('destination was already hit by you; retry');
			point = null;
		}
	} while (point === null);

	var shipHitted = this.enemyBattlefield.Hit(point);
	if (shipHitted) {
		console.log('!!!! your hit the enemy\'s ship at point:' + Converter.ToDisplayCoord(point));
		if (this.enemyBattlefield.CheckIfShipsLeft() === false) {
			console.log('!!!!!!!!!!!!!!!!!!!! You\'ve won!!! ');
			this.GameStarted = false;
		}
		return true;
	} else {
		console.log('you\'ve missed!! :' + Converter.ToDisplayCoord(point));
		return false;
	}
}

async StartGame() {
	console.log('loading game..');
	this.GameStarted = true;

	while (this.GameStarted) {
		var repeatStrike = false;
		//enemy attack
		do {
			repeatStrike = EnemyAI.EnemyStrike(this.playerBattlefield);
			if (repeatStrike === null) {
				this.GameStarted = false;
			}
		} while (repeatStrike === true);

		if (this.GameStarted) {
			do {
				repeatStrike = await this.PlayerStrike();
			} while (repeatStrike === true && this.GameStarted === true);
		}

		console.log('Your battlefield:');
		this.playerBattlefield.Print(true);

		console.log('\nenemy\'s battlefield:');
		this.enemyBattlefield.Print();
	}
}
}

export {Manager}
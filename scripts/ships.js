import {Point} from "./utils.js";

class Ship {
	constructor(x,y) {
		this.type = "none";
		this.size = 0;
		this.headPoint = new Point(x,y);
	}
	
	ToString() {
		return `SHIP: ${this.type} ${this.size} ${this.headPoint.ToString()}`;
	}
}

class Battleship extends Ship {
	constructor(x,y) {
		super(x,y);
		this.type = "battleship";
		this.size = 5;
	}	
}


class Destroyer extends Ship {
	constructor(x,y) {
		super(x,y);
		this.type = "destroyer";
		this.size = 4;
	}	
}

export { Ship,Battleship,Destroyer };
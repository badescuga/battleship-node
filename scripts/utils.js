class Point {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
	
	ToString() {
		return`(${this.x},${this.y})`; 
	}
}

export {Point};
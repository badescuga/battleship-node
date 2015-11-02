class Point {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
	
	ToString() {
		return`(${this.x},${this.y})`; 
	}
}

class Converter {
	static ToBattleshipCoord(str) { // forced for battlefield size of 10x10
		if(str.length === 2) {
			var first = str.charCodeAt(0);
			var second = str.charAt(1);
			if ( ((first >= 65) && (first < 75)) || ((first >= 97) && (first < 107)) ) {
				
				var nr = parseInt(second+"");
				if(nr != null) {
					if(nr >= 0 && nr < 10) {
						return new Point( first >= 97 ? first - 97 + 1: first - 65 + 1, nr + 1);
					}
				}
				}
		}
		return null;
	}

	
}

export {Point, Converter};
import Soul = require('./soul');

class SoulCollection {
	souls: Array<Soul> = [];
	
	constructor(private game: Phaser.Game) {
	}
	
	add(x: number, y: number, playerNumber: number) {
		this.souls.push(new Soul(this.game, x, y, playerNumber));
	}
	
	reset() {
		for (var i = 0; i < this.souls.length; i++) {
			this.souls[i].complete();
		}
	}
}

export = SoulCollection;
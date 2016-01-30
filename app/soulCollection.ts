import Soul = require('./soul');

class SoulCollection {
	souls: Array<Soul> = [];
	
	constructor(private game: Phaser.Game) {
	}
	
	add(x: number, y: number) {
		this.souls.push(new Soul(this.game, x, y));
	}
}

export = SoulCollection;
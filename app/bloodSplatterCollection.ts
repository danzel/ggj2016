import BloodSplatter = require('./bloodSplatter');

class BloodSplatterCollection {
	game: Phaser.Game;
	bloodSplatters: Array<BloodSplatter> = [];
	
	constructor(game: Phaser.Game) {
		this.game = game;
	}
	
	add(x: number, y: number) {
		if (this.bloodSplatters.length >= 20)
			return;
		this.bloodSplatters.push(new BloodSplatter(this.game, x, y, this));		
	}
	
	public remove(bs: BloodSplatter) {
		var index = this.bloodSplatters.indexOf(bs);
		this.bloodSplatters.splice(index, 1);
		
	}	
}

export = BloodSplatterCollection;
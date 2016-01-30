import BloodSplatter = require('./bloodSplatter');

class BloodSplatterCollection {
	game: Phaser.Game;
	bloodSplatters: Array<BloodSplatter> = [];
	
	constructor(game: Phaser.Game) {
		this.game = game;
	}
	
	add(x: number, y: number, duration: number, numParticles: number) {
		if (this.bloodSplatters.length >= 100)
			return;
		this.bloodSplatters.push(new BloodSplatter(this.game, x, y, this, duration, numParticles));		
	}
	
	public remove(bs: BloodSplatter) {
		var index = this.bloodSplatters.indexOf(bs);
		this.bloodSplatters.splice(index, 1);
	}
	
	reset() {
		for (let i = 0; i < this.bloodSplatters.length; i++) {
			this.bloodSplatters[i].destroyEmitter();
		}
	}	
}

export = BloodSplatterCollection;
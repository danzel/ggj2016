class Soul {
	sprite: Phaser.Sprite;
	
	constructor(game: Phaser.Game, x: number, y: number) {
		this.sprite = game.add.sprite(x, y, 'soul');
		game.add.tween(this.sprite).to({ y: -50 }, 450, k => Math.pow(k, 1.9), true);
		game.add.tween(this.sprite).to({ x: x + 25 }, 450, k => Math.sin(k * Math.PI*2), true);
		var emitter = game.add.emitter(x, y, 10);
		emitter.makeParticles('soul');
		emitter.alpha = 0.1;
		emitter.start(false, 100, 50);
		game.add.tween(emitter).to({ y: -50 }, 450, k => Math.pow(k, 1.9), true);
		game.add.tween(emitter).to({ x: x + 25 }, 450, k => Math.sin(k * Math.PI*2), true);
				
	}
}

export = Soul;
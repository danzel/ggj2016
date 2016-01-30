class Soul {
	sprite: Phaser.Sprite;
	emitter: Phaser.Particles.Arcade.Emitter;
	
	constructor(game: Phaser.Game, x: number, y: number, playerNumber: number) {
		this.sprite = game.add.sprite(x, y, 'soul');
		var tween = game.add.tween(this.sprite).to({ y: -50 }, 450, k => Math.pow(k, 1.9), true);
		tween.onComplete.add(this.complete, this);
		var tweenX = x + (playerNumber == 2 ? -25 : 25);
		game.add.tween(this.sprite).to({ x: tweenX }, 450, k => Math.sin(k * Math.PI*2), true);
		this.emitter = game.add.emitter(x, y, 10);
		this.emitter.makeParticles('soul');
		this.emitter.alpha = 0.1;
		this.emitter.start(false, 100, 50);
		game.add.tween(this.emitter).to({ y: -50 }, 450, k => Math.pow(k, 1.9), true);
		game.add.tween(this.emitter).to({ x: tweenX }, 450, k => Math.sin(k * Math.PI*2), true);
	}
	
	complete() {
		this.sprite.destroy();
		this.emitter.destroy();
	}
}

export = Soul;
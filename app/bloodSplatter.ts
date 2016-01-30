import BloodSplatterCollection = require('./bloodSplatterCollection');

class BloodSplatter {
	emitter: Phaser.Particles.Arcade.Emitter;
	owner: BloodSplatterCollection;
	
	constructor(game: Phaser.Game, x: number, y: number, owner: BloodSplatterCollection) {
		this.owner = owner;
		this.emitter = game.add.emitter(x, y, 30);
		this.emitter.makeParticles('blood');
		this.emitter.start(true, 250, null, 30);
		game.time.events.add(260, this.destroyEmitter, this);
	}
	
	destroyEmitter() {
		this.emitter.destroy();
		this.owner.remove(this);
	}
}

export = BloodSplatter;
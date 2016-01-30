import BloodSplatterCollection = require('./bloodSplatterCollection');

class BloodSplatter {
	emitter: Phaser.Particles.Arcade.Emitter;
	owner: BloodSplatterCollection;
	
	constructor(game: Phaser.Game, x: number, y: number, owner: BloodSplatterCollection, duration: number, numParticles: number) {
		this.owner = owner;
		this.emitter = game.add.emitter(x, y, numParticles);
		this.emitter.makeParticles('blood');
		this.emitter.setAlpha(0, 1, duration, k => 1 - k * k);
		this.emitter.start(true, duration, null, numParticles);
		game.time.events.add(duration, this.destroyEmitter, this);
	}
	
	destroyEmitter() {
		this.emitter.destroy();
		this.owner.remove(this);
	}
}

export = BloodSplatter;
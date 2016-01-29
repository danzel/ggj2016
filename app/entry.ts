import ImageLoader = require('./imageLoader');

class AppEntry {
	game: Phaser.Game;

	constructor() {
		this.game = new Phaser.Game(1280, 720, Phaser.AUTO, '', this, false, true, null);
	}
	
	preload() {
		//this.game.stage.disableVisibilityChange = true;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		ImageLoader.load(this.game);
	}

	create() {
		this.game.add.sprite(10, 10, 'test');
	}

	update() {
		//debugger;
		//this.game.time.physicsElapsed
	}
}

new AppEntry();
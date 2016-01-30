import Globals = require('./globals');
import ImageLoader = require('./imageLoader');

import GameState = require('./states/gameState');
import PlayingGame = require('./states/playingGame');

class AppEntry {
	game: Phaser.Game;
	
	music: Phaser.Sound;
	
	activeState: GameState;
	

	constructor() {
		this.game = new Phaser.Game(1280, 720, Phaser.AUTO, '', this, false, true, null);
	}

	preload() {
		//this.game.stage.disableVisibilityChange = true;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		ImageLoader.load(this.game);
	}

	create() {
		Globals.oneTimeInit(this.game);
		this.game.input.gamepad.start();

		this.music = this.game.add.audio('music', 1, true);
		this.music.play();
		
		
		this.activeState = new PlayingGame(this.game);
	}

	update() {
		this.activeState = this.activeState.update();
	}
}

new AppEntry();
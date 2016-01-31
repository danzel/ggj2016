import Globals = require('./globals');
import ImageLoader = require('./imageLoader');

import GameState = require('./states/gameState');
import ControlsSplash = require('./states/controlsSplash');
import PlayingGame = require('./states/playingGame');
import SplashScreen = require('./states/splashScreen');

class AppEntry {
	game: Phaser.Game;

	music: Phaser.Sound;

	activeState: GameState;
	current: string;

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

		this.current = 'splash';
		this.activeState = new SplashScreen(this.game);
		//this.activeState = new PlayingGame(this.game);
	}

	update() {
		let want = this.activeState.update();

		if (want != this.current) {
			switch (want) {
				case 'splash':
					this.activeState = new SplashScreen(this.game);
					break;
				case 'controls':
					this.activeState = new ControlsSplash(this.game);
					break;
				case 'game':
					this.activeState = new PlayingGame(this.game);
					break;
			}
			this.current = want;
		}
	}
}

new AppEntry();
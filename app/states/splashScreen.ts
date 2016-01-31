import GameState = require('./gameState');
import ControlsSplash = require('./controlsSplash');
import PlayingGame = require('./playingGame');
import Hack = require('./hack');

class SplashScreen implements GameState {

	sprite: Phaser.Sprite;
	
	initialTextWidth: number;
	
	hackover: Phaser.Graphics;
	
	constructor(private game: Phaser.Game) {
		this.sprite = game.add.sprite(0, 0, 'splash');


		this.createText();
		
	}
	
	createText() {
		
		this.hackover = this.game.add.graphics(0, 0);
		this.hackover.beginFill(0x000000, 1);
		this.hackover.drawRect(0,0,1280,720);
		this.hackover.endFill();
		
		let t = this.game.add.tween(this.hackover)
			.to({ alpha: 0 }, 3000)
			.start();
	}

	update(): string {
		
		let startDownNow =
			(this.game.input.gamepad.pad1.connected && this.game.input.gamepad.pad1.getButton(Phaser.Gamepad.XBOX360_START).isDown) ||
			(this.game.input.gamepad.pad2.connected && this.game.input.gamepad.pad2.getButton(Phaser.Gamepad.XBOX360_START).isDown);
			
		if (startDownNow) {
			Hack.startDown = startDownNow;
			return 'game';
		}
		Hack.startDown = startDownNow;
		
		return 'splash';
	}
}

export = SplashScreen;
import GameState = require('./gameState');
import ControlsSplash = require('./controlsSplash');
import PlayingGame = require('./playingGame');
import Hack = require('./hack');

class SplashScreen implements GameState {

	sprite: Phaser.Sprite;
	text: Phaser.Text;
	
	initialTextWidth: number;
	
	constructor(private game: Phaser.Game) {
		this.sprite = game.add.sprite(0, 0, 'splash');


		this.createText();
		
		this.initialTextWidth = this.text.width;
		
	}
	
	createText() {
		this.text = new Phaser.Text(this.game, 1280 / 2, 720 - 120, 'Press Start to Play', {
			font: '30pt MetalMacabre,fantasy',
			boundsAlignH: 'center',
			stroke: 'white',
			strokeThickness: 6
		});
		this.text.setTextBounds(0, 0, 0, 100);
		this.sprite.addChild(this.text);

		let tween = this.game.add.tween(this.text.scale)
			.to({ x: 1.2, y: 1.2 }, 500, Phaser.Easing.Cubic.InOut, false, 0, -1, true);
		tween.start();
	}

	update(): string {
		
		if (this.text.width == this.initialTextWidth) {
			this.text.destroy();
			this.createText();
		}

		let startDownNow =
			(this.game.input.gamepad.pad1.connected && this.game.input.gamepad.pad1.getButton(Phaser.Gamepad.XBOX360_START).isDown) ||
			(this.game.input.gamepad.pad2.connected && this.game.input.gamepad.pad2.getButton(Phaser.Gamepad.XBOX360_START).isDown);
			
		if (startDownNow) {
			Hack.startDown = startDownNow;
			return 'controls';
		}
		Hack.startDown = startDownNow;
		
		return 'splash';
	}
}

export = SplashScreen;
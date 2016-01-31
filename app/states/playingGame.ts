import GameState = require('./gameState');
import ControlsSplash = require('./controlsSplash');
import GGHandler = require('../ggHandler');
import Globals = require('../globals');
import Harvester = require('../harvester');
import ImageLoader = require('../imageLoader');
import Lamb = require('../lamb');
import Player = require('../player');
import SacrificePit = require('../sacrificePit');
import Ui = require('../ui');
import Hack = require('./hack');

class PlayingGame implements GameState {
	game: Phaser.Game;
	ui: Ui;
	ggHandler: GGHandler;
	players: Array<Player> = [];
	sacrificePits: Array<SacrificePit> = [];

	swapButtonDown: boolean = false;

	hackStart: number;

	constructor(game: Phaser.Game) {
		this.game = game;
		this.hackStart = game.time.now;

		this.game.add.sprite(0, 0, 'bg');
		Globals.init();
		this.game.input.gamepad.start();


		this.players.push(new Player(this.game, 1, this.game.input.gamepad.pad1, this.game.input.gamepad.pad2));
		this.players.push(new Player(this.game, 2, this.game.input.gamepad.pad2, this.game.input.gamepad.pad1));

		this.sacrificePits.push(new SacrificePit(this.game, this.players[0]));
		this.sacrificePits.push(new SacrificePit(this.game, this.players[1]));


		Globals.gameObjects.push(this.players[0], this.players[1], this.sacrificePits[0], this.sacrificePits[1]);

		for (let i = 0; i < 100; i++) {
			Globals.gameObjects.push(new Lamb(this.game, 200 + (1280 - 200 - 200) * Math.random(), 720 * Math.random()));
		}

		this.ui = new Ui(this.game, this.players);

		this.ggHandler = new GGHandler(game, this.players);

		//this.hack2();
		//this.hackzoomdown();
	}

	lastSpawn = 0;
	update(): string {


		this.hack();
		//if (!this.winner) {
		//	checkForDeadPlayers();
		//}

		for (let i = 0; i < Globals.gameObjects.length; i++) {
			//tidy up
			if (!Globals.gameObjects[i].sprite.alive) {
				Globals.gameObjects.splice(i, 1);
				continue;
			}

			Globals.gameObjects[i].update();
		}
		for (let i = Globals.shots.length - 1; i >= 0; i--) {
			Globals.shots[i].update();
		}


		this.ui.update();
		this.ggHandler.update();
		//debugger;
		//this.game.time.physicsElapsed
		
		if (this.game.input.gamepad.pad1.connected) {
			if (this.game.input.gamepad.pad1.getButton(Phaser.Gamepad.XBOX360_BACK).isDown) {
				if (!this.swapButtonDown) {
					this.swapButtonDown = true;
					this.players[0].swapGamepad();
					this.players[1].swapGamepad();
				}
			} else {
				this.swapButtonDown = false;
			}
		}

		if (this.lastSpawn < this.game.time.now - 2000) {
			this.lastSpawn = this.game.time.now;

			for (let i = 0; i < 1; i++) {
				Globals.gameObjects.push(new Lamb(this.game, 1280 / 2 - 100 + 200 * Math.random(), 0 + 200 * Math.random()));

				Globals.gameObjects.push(new Lamb(this.game, 1280 / 2 - 100 + 200 * Math.random(), 720 - 200 + 200 * Math.random()));
			}
		}

		let startDownNow =
			(this.game.input.gamepad.pad1.connected && this.game.input.gamepad.pad1.getButton(Phaser.Gamepad.XBOX360_START).isDown) ||
			(this.game.input.gamepad.pad2.connected && this.game.input.gamepad.pad2.getButton(Phaser.Gamepad.XBOX360_START).isDown);
		if (startDownNow && !Hack.startDown) {
			Hack.startDown = startDownNow;

			Globals.tidyUpMaybe();
			//Globals.removeStuff();
			//this.game.physics.reset();
			
			console.log(this.game.world.children.length)
			return 'controls';
			//return new PlayingGame(this.game);
		}
		Hack.startDown = startDownNow;

		return 'game';
	}

	hack2() {
		this.game.camera.scale.set(2);
		this.game.camera.bounds = null;
		return;
		this.game.camera.bounds.x -= 1280;
		this.game.camera.bounds.width += 1280 * 2;
		this.game.camera.bounds.y -= 720;
		this.game.camera.bounds.height += 720 * 2;

	}

	hackzoomdown() {
		this.game.add.tween(this.game.camera.scale)
			.to({ x: 2, y: 2}, 2000)
			.start();
			
		this.game.camera.bounds = null;
			//this.game.camera.view.y = 1000;
			//return;
		this.game.add.tween(this.game.camera.view)
			.to({ y: 720 / 2 }, 2000)
			.start();
			
	}
	
	textArray: Array<string> = [
		'heart Racing Action!',
		'gut wrenching slaughter',
		'fear inducing fatalities',
		'intense micro mania',
		'soul sucking strategy',
		'mind melting mayhem',
		'brain bending beings',
		'utmost terror',
		'5 / 7 ign',
		'competitive e-sport'
	];
	
	hack() {
		if (this.ggHandler.isGG) {
			return;
		}
		if ((this.game.time.now - this.hackStart) > 3000) {
			this.hackStart = this.game.time.now;
			
			let text = this.textArray[Math.floor(Math.random() * this.textArray.length)];
			
			this.showShitText(text);
			
			/*if (secs > 30 && !this.zoomed) {
				this.zoomed = true;
				this.hackzoomdown();
			}*/
		}
	}

	showShitText(value: string) {
		let bg = this.game.add.graphics(0, 0);
		bg.beginFill(0x0c0112, 0.7);
		bg.drawRect(0, 0, 1280, 720);
		bg.endFill();
		let t = this.game.add.tween(bg)
			.to({ alpha: 0 }, 1500)
			.start();

		let text = this.game.add.text(1280 / 2, 120, value, {
			font: '66pt MetalMacabre,fantasy',
			boundsAlignH: 'center',
			fill: '#b00d38',
			stroke: '#2d0102',
			strokeThickness: 6
		})
		text.angle = Math.random() * 50 - 25;
		text.setTextBounds(0, 0, 0, 0);

		this.game.add.tween(text)
			.to({}, 1000)
			.start()
			.onComplete.add(() => {
				this.game.add.tween(text)
					.to({ alpha: 0 }, 500)
					.start();
			});
	}
}

export = PlayingGame;
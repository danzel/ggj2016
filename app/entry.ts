import Globals = require('./globals');
import Harvester = require('./harvester');
import ImageLoader = require('./imageLoader');
import Lamb = require('./lamb');
import Materials = require('./materials');
import Player = require('./player');
import SacrificePit = require('./sacrificePit');
import Ui = require('./ui');

class AppEntry {
	game: Phaser.Game;
	ui: Ui;

	players: Array<Player> = [];
	sacrificePits: Array<SacrificePit> = [];

	swapButtonDown: boolean = false;
	
	music: Phaser.Sound;

	constructor() {
		this.game = new Phaser.Game(1280, 720, Phaser.AUTO, '', this, false, true, null);
	}

	preload() {
		//this.game.stage.disableVisibilityChange = true;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		ImageLoader.load(this.game);
	}

	create() {
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.setImpactEvents(true);
		this.game.physics.p2.restitution = 0.8;
		this.game.add.sprite(0, 0, 'bg');
		Globals.init(this.game);
		Materials.init(this.game);
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

		this.music = this.game.add.audio('music', 1, true);
		this.music.play();
	}

	lastSpawn = 0;
	update() {
		
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
	}
}

new AppEntry();
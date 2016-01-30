import GameState = require('./gameState');
import GGHandler = require('../ggHandler');
import Globals = require('../globals');
import Harvester = require('../harvester');
import ImageLoader = require('../imageLoader');
import Lamb = require('../lamb');
import Player = require('../player');
import SacrificePit = require('../sacrificePit');
import Ui = require('../ui');

class PlayingGame implements GameState {
	game: Phaser.Game;
	ui: Ui;
	ggHandler: GGHandler;
	players: Array<Player> = [];
	sacrificePits: Array<SacrificePit> = [];

	swapButtonDown: boolean = false;

	constructor(game: Phaser.Game) {
		this.game = game;

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
		if (startDownNow && !PlayingGame.startDown) {
			PlayingGame.startDown = startDownNow;

			Globals.tidyUpMaybe();
			//Globals.removeStuff();
			//this.game.physics.reset();
			
			console.log(this.game.world.children.length)
			return new PlayingGame(this.game);
		}
		PlayingGame.startDown = startDownNow;

		return this;
	}

	static startDown: boolean;
}

export = PlayingGame;
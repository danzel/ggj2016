import ImageLoader = require('./imageLoader');
import Player = require('./player');
import SacrificePit = require('./sacrificePit');

class AppEntry {
	game: Phaser.Game;
	players: Array<Player> = [];
	sacrificePits: Array<SacrificePit> = [];
	
	
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
		this.game.input.gamepad.start();
		
		this.players.push(new Player(this.game, 1, this.game.input.gamepad.pad1));
		this.players.push(new Player(this.game, 2, this.game.input.gamepad.pad2));
		
		this.sacrificePits.push(new SacrificePit(this.game, this.players[0]));
		this.sacrificePits.push(new SacrificePit(this.game, this.players[1]));
		
		this.game.add.sprite(10, 10, 'test');
		
	}

	update() {
		
		for (let i = 0; i < this.players.length; i++) {
			this.players[i].update();
		}
		//debugger;
		//this.game.time.physicsElapsed
	}
}

new AppEntry();
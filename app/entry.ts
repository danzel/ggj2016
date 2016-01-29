import Globals = require('./globals');
import ImageLoader = require('./imageLoader');
import Lamb = require('./lamb');
import Player = require('./player');
import SacrificePit = require('./sacrificePit');
import Ui = require('./ui');

class AppEntry {
	game: Phaser.Game;
	ui: Ui;
	
	players: Array<Player> = [];
	sacrificePits: Array<SacrificePit> = [];
	lambs: Array<Lamb> = [];

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
		Globals.init(this.game);
		this.game.input.gamepad.start();
		
		this.game.add.sprite(0, 0, 'bg');

		this.players.push(new Player(this.game, 1, this.game.input.gamepad.pad1));
		this.players.push(new Player(this.game, 2, this.game.input.gamepad.pad2));

		this.sacrificePits.push(new SacrificePit(this.game, this.players[0]));
		this.sacrificePits.push(new SacrificePit(this.game, this.players[1]));


		for (let i = 0; i < 100; i++) {
			this.lambs.push(new Lamb(this.game, 200 + (1280 - 200 - 200) * Math.random(), 720 * Math.random()));
		}

		this.ui = new Ui(this.game, this.players);
	}

	update() {

		for (let i = 0; i < this.players.length; i++) {
			this.players[i].update();
		}
		this.ui.update();
		//debugger;
		//this.game.time.physicsElapsed
	}
}

new AppEntry();
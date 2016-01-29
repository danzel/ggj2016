import Globals = require('./globals');
import Player = require('./player');

class SacrificePit {
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;

	constructor(private game: Phaser.Game, private player: Player) {
		//TODO: body and position based on player id
		
		if (player.id == 1) {
			this.sprite = game.add.sprite(50, 720 / 2); //TODO graphic
		} else {
			this.sprite = game.add.sprite(1280 - 50, 720 / 2); //TODO: Grpahiuc
		}

		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;

		game.physics.p2.enable(this.sprite, true);
		this.body = <Phaser.Physics.P2.Body>this.sprite.body;

		this.sprite.body.setCircle(50);
		this.sprite.body.static = true;

		this.body.setCollisionGroup(Globals.pitCollisionGroup);
		this.body.collides([Globals.playerCollisionGroup, Globals.lambCollisionGroup]);
	}
}

export = SacrificePit;
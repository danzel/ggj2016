import GameObject = require('./gameObject');
import Globals = require('./globals');
import Player = require('./player');

class SacrificePit implements GameObject {
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;

	constructor(private game: Phaser.Game, private player: Player) {
		player.sacrificePit = this;

		if (player.id == 1) {
			this.sprite = game.add.sprite(50, 720 / 2, 'altar2');
		} else {
			this.sprite = game.add.sprite(1280 - 50, 720 / 2, 'altar2');
		}
		this.sprite.smoothed = false;
		this.sprite.scale.set(1.5);

		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;

		game.physics.p2.enable(this.sprite, false);
		this.body = <Phaser.Physics.P2.Body>this.sprite.body;

		this.sprite.body.setCircle(50);
		this.sprite.body.static = true;

		this.body.setCollisionGroup(Globals.pitCollisionGroup);
		this.body.collides(Globals.playerCollisionGroup, this.playerCollision, this);


		this.body.collides([Globals.playerCollisionGroup, Globals.lambCollisionGroup]);
	}

	playerCollision(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body) {
		let player = <Player>(<any>body2).player;

		for (let i = player.followers.length - 1; i >= 0; i--) {
			var lamb = player.followers[i];
			
			//TODO: move the lamb in to the pit instead
			lamb.sprite.destroy(); //TODO: remove from lambs list too (handled in entry update ATM)
			
			player.addMana(10);

			Globals.lambSacrificed.trigger(lamb);
		}
	}

	update() {

	}
}

export = SacrificePit;
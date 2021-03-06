import GameObject = require('./gameObject');
import Globals = require('./globals');
import Harvester = require('./harvester');
import Lamb = require('./lamb');
import Player = require('./player');

class SacrificePit implements GameObject {
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;

	constructor(private game: Phaser.Game, private player: Player) {
		player.sacrificePit = this;

		if (player.id == 1) {
			this.sprite = Globals.layerGround.add(new Phaser.Sprite(game, 50, 720 / 2, 'altar' + player.id));
		} else {
			this.sprite = Globals.layerGround.add(new Phaser.Sprite(game, 1280 - 50, 720 / 2, 'altar' + player.id));
		}
		this.sprite.animations.add('altarAnim', [0, 1, 2, 1], 3, true);
		this.sprite.animations.play('altarAnim');
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
		this.body.collides(Globals.groundCreatureCollisionGroup, this.groundCreatureCollision, this);


		this.body.collides([Globals.playerCollisionGroup, Globals.lambCollisionGroup, Globals.flyingSensorCollisionGroup]);
	}

	playerCollision(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body) {
		let player = <Player>(<any>body2).player;

		for (let i = player.followers.length - 1; i >= 0; i--) {
			var lamb = player.followers[i];

			this.eatLamb(lamb);
		}
	}

	groundCreatureCollision(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body) {
		if ((<any>body2).harvester) {
			let harvester = <Harvester>(<any>body2).harvester;
			
			if (harvester.target && harvester.isDraggingTarget) {
				this.eatLamb(harvester.target);
			}
		}
	}

	private eatLamb(lamb: Lamb) {
		//TODO: move the lamb in to the pit instead
		lamb.sprite.destroy(); //TODO: remove from lambs list too (handled in entry update ATM)
			
		this.player.addMana(10);

		Globals.lambSacrificed.trigger(lamb);
		
		Globals.addBloodSplatter(this.sprite.x, this.sprite.y, 1000, 12);
		Globals.addSoul(this.sprite.x - 12, this.sprite.y - 45, this.player.id);
		Globals.soundscape.addScream();
	}
	update() {

	}
}

export = SacrificePit;
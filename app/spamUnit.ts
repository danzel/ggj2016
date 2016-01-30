import Globals = require('./globals');
import Player = require('./player');
import SummonedUnit = require('./summonedUnit');

class SpamUnit extends SummonedUnit {
	constructor(game: Phaser.Game, player: Player, x: number, y: number) {
		super(game, player, x, y, {
			size: 10,

			health: 6,
			dps: 5,
			desiredTargetDistance: 0,

			movementForce: 40,
			massMultiplier: 0.5,

			layer: Globals.layerGround,
			collisionGroup: Globals.groundCreatureCollisionGroup,
			collidesWith: [Globals.lambCollisionGroup, Globals.playerCollisionGroup, Globals.pitCollisionGroup, Globals.groundCreatureCollisionGroup, Globals.flyingSensorCollisionGroup],
			sprite: 'spam' + player.id
		});

		this.sprite.scale.set(0.5);
	}
}

export = SpamUnit;
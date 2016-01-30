import Globals = require('./globals');
import Player = require('./player');
import SummonedUnit = require('./summonedUnit');

class ShootingUnit extends SummonedUnit {
	
	constructor(game: Phaser.Game, player: Player, x: number, y: number) {
		super(game, player, x, y, {
			capsuleLength: 30,
			size: 12,

			health: 40,
			dps: 10,
			
			movementForce: 30,
			massMultiplier: 1,

			layer: Globals.layerGround,
			collisionGroup: Globals.groundCreatureCollisionGroup,
			collidesWith: [Globals.lambCollisionGroup, Globals.playerCollisionGroup, Globals.pitCollisionGroup, Globals.groundCreatureCollisionGroup, Globals.flyingSensorCollisionGroup],
			sprite: 'thrower' + player.id
		});
	}
}

export = ShootingUnit;
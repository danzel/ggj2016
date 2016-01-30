import Globals = require('./globals');
import Player = require('./player');
import SummonedUnit = require('./summonedUnit');

class TankUnit extends SummonedUnit {
	constructor(game: Phaser.Game, player: Player, x: number, y: number) {
		super(game, player, x, y, {
			capsuleLength: 40,
			size: 30,

			health: 150,
			dps: 5,
			desiredTargetDistance: 0,

			movementForce: 200,
			massMultiplier: 30,

			layer: Globals.layerGround,
			collisionGroup: Globals.groundCreatureCollisionGroup,
			collidesWith: [Globals.lambCollisionGroup, Globals.playerCollisionGroup, Globals.pitCollisionGroup, Globals.groundCreatureCollisionGroup, Globals.flyingSensorCollisionGroup],
			sprite: 'tank' + player.id,
			shadow: { sprite: 'shadow-tank', x: 3, y: 3 }
		});
	}
}

export = TankUnit;
import Globals = require('./globals');
import Player = require('./player');
import SummonedUnit = require('./summonedUnit');

class TankUnit extends SummonedUnit {
	constructor(game: Phaser.Game, player: Player, x: number, y: number) {
		super(game, player, x, y, {
			capsuleLength: 40,
			size: 30,
			health: 50,
			layer: Globals.layerGround,
			movementForce: 500,
			massMultiplier: 50,
			collisionGroup: Globals.groundCreatureCollisionGroup,
			collidesWith: [Globals.lambCollisionGroup, Globals.playerCollisionGroup, Globals.pitCollisionGroup, Globals.groundCreatureCollisionGroup, Globals.flyingSensorCollisionGroup],
			sprite: 'tank' + player.id,
		});
	}
}

export = TankUnit;
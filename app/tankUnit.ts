import Globals = require('./globals');
import Player = require('./player');
import SummonedUnit = require('./summonedUnit');

class TankUnit extends SummonedUnit {
	constructor(game: Phaser.Game, player: Player, x: number, y: number) {
		super(game, player, x, y, {
			size: 30,
			health: 50,
			movementForce: 35,
			collisionGroup: Globals.groundCreatureCollisionGroup,
			collidesWith: [Globals.lambCollisionGroup, Globals.playerCollisionGroup, Globals.pitCollisionGroup, Globals.groundCreatureCollisionGroup],
			sprite: 'tank2'
		});
	}
}

export = TankUnit;
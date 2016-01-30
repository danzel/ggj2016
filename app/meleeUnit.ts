import Globals = require('./globals');
import Player = require('./player');
import SummonedUnit = require('./summonedUnit');

class MeleeUnit extends SummonedUnit {
	constructor(game: Phaser.Game, player: Player, x: number, y: number) {
		super(game, player, x, y, {
			size: 20,
			health: 40,
			movementForce: 30,
			massMultiplier: 1,
			collisionGroup: Globals.groundCreatureCollisionGroup,
			collidesWith: [Globals.lambCollisionGroup, Globals.playerCollisionGroup, Globals.pitCollisionGroup, Globals.groundCreatureCollisionGroup, Globals.flyingSensorCollisionGroup],
			sprite: 'warrior' + player.id
		});
	}
}

export = MeleeUnit;
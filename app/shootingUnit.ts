import CombatUnit = require('./combatUnit');
import Globals = require('./globals');
import Player = require('./player');
import Shot = require('./shot');
import SummonedUnit = require('./summonedUnit');

class ShootingUnit extends SummonedUnit {

	constructor(game: Phaser.Game, player: Player, x: number, y: number) {
		super(game, player, x, y, {
			capsuleLength: 30,
			size: 12,

			health: 40,
			dps: 0, //hack fml
			desiredTargetDistance: 200,

			movementForce: 30,
			massMultiplier: 1,

			layer: Globals.layerGround,
			collisionGroup: Globals.groundCreatureCollisionGroup,
			collidesWith: [Globals.lambCollisionGroup, Globals.playerCollisionGroup, Globals.pitCollisionGroup, Globals.groundCreatureCollisionGroup, Globals.flyingSensorCollisionGroup],
			sprite: 'thrower' + player.id
		});
	}


	shotDamage = 2;
	shotSpeed = 700;
	
	shotTime = 500;
	lastShot = 0;

	update() {
		super.update();

		if (this.target && this.distanceTo(this.target) < this.def.desiredTargetDistance && this.lastShot < this.game.time.now - this.shotTime) {
			let target = this.target;
			this.lastShot = this.game.time.now;
			
			Globals.shots.push(new Shot(this.game, this, this.target, this.shotSpeed, this.shotDamage));
		}
	}
	
	protected canAttack(cu: CombatUnit) {
		//we can shoot flying
		return true;
	}
}

export = ShootingUnit;
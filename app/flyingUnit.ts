import Globals = require('./globals');
import Player = require('./player');
import SummonedUnit = require('./summonedUnit');

class FlyingUnit extends SummonedUnit {

	circleBody: Phaser.Physics.P2.Body;
	isFlying = true;

	constructor(game: Phaser.Game, player: Player, x: number, y: number) {
		super(game, player, x, y, {
			size: 16,
			health: 40,
			movementForce: 30,
			massMultiplier: 1,
			collisionGroup: Globals.flyingCreatureCollisionGroup,
			collidesWith: [Globals.flyingCreatureCollisionGroup],
			sprite: 'flying2'
		});
		
		//Hack: Undo the default collision handlers:
		this.body.onBeginContact.remove(this.beginContact, this);
		this.body.onEndContact.remove(this.endContact, this);
		
		//Now create a sensor and use that instead
		this.circleBody = game.physics.p2.createBody(x, y, 1);
		let shape = this.circleBody.addCircle(20);
		shape.sensor = true;
		game.physics.p2.addBody(this.circleBody);

		this.circleBody.setCollisionGroup(Globals.flyingSensorCollisionGroup);
		this.circleBody.collides([Globals.flyingCreatureCollisionGroup, Globals.groundCreatureCollisionGroup, Globals.playerCollisionGroup]);

		this.circleBody.onBeginContact.add(this.beginContact, this);
		this.circleBody.onEndContact.add(this.endContact, this);

		var constraint = game.physics.p2.createDistanceConstraint(this.body, this.circleBody, 1);
	}
	/*beginContact(bodyA: Phaser.Physics.P2.Body, bodyB: Phaser.Physics.P2.Body) {
			debugger;
			super.beginContact(bodyA, bodyB);
		}
		endContact(bodyA: Phaser.Physics.P2.Body, bodyB: Phaser.Physics.P2.Body) {
	}*/
}

export = FlyingUnit;
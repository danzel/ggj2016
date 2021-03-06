import Globals = require('./globals');
import Player = require('./player');
import SummonedUnit = require('./summonedUnit');

class FlyingUnit extends SummonedUnit {

	circleBody: Phaser.Physics.P2.Body;
	isFlying = true;

	constraint: Phaser.Physics.P2.DistanceConstraint;

	shadow: Phaser.Sprite;

	constructor(game: Phaser.Game, player: Player, x: number, y: number) {
		super(game, player, x, y, {
			size: 16,

			health: 20,
			dps: 7,
			desiredTargetDistance: 10,
			
			movementForce: 30,
			massMultiplier: 1,

			layer: Globals.layerFlying,
			collisionGroup: Globals.flyingCreatureCollisionGroup,
			collidesWith: [Globals.flyingCreatureCollisionGroup, Globals.flyingSensorCollisionGroup],
			sprite: 'flying' + player.id,
			
			shadow: { sprite: 'shadow-flying', x: 6, y: 16 }
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

		this.constraint = game.physics.p2.createDistanceConstraint(this.body, this.circleBody, 1);
	}

	preDie() {
		this.game.physics.p2.removeConstraint(this.constraint);
	}

	onDead() {
		super.onDead();
		
		this.circleBody.removeFromWorld();
		this.circleBody.clearShapes();
	}
	/*beginContact(bodyA: Phaser.Physics.P2.Body, bodyB: Phaser.Physics.P2.Body) {
			debugger;
			super.beginContact(bodyA, bodyB);
		}
		endContact(bodyA: Phaser.Physics.P2.Body, bodyB: Phaser.Physics.P2.Body) {
	}*/
}

export = FlyingUnit;
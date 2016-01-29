import CombatUnit = require('./combatUnit');
import GameObject = require('./gameObject');
import Globals = require('./globals');
import Player = require('./player');
import Materials = require('./materials');


class MeleeUnit extends CombatUnit {
	collidingWith: Array<CombatUnit> = [];

	target: CombatUnit;

	constructor(private game: Phaser.Game, player: Player, x: number, y: number) {
		super(game, player, 40);

		this.sprite = game.add.sprite(x, y);
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;

		game.physics.p2.enable(this.sprite, true);
		this.body = <Phaser.Physics.P2.Body>this.sprite.body;
		(<any>this.body).combatUnit = this;
		this.body.setCircle(20);
		this.body.damping = 0.9999;
		this.body.fixedRotation = true;
		this.body.setMaterial(Materials.groundUnitMaterial);

		this.body.setCollisionGroup(Globals.groundCreatureCollisionGroup);
		
		//Be careful to put callback ones first (or don't put callback ones in the second array)
		//this.body.collides(Globals.lambCollisionGroup, this.lambCollision, this);

		this.body.collides([Globals.lambCollisionGroup, Globals.playerCollisionGroup, Globals.pitCollisionGroup, Globals.groundCreatureCollisionGroup]);
		
		//http://phaser.io/examples/v2/p2-physics/contact-events
		this.body.onBeginContact.add(this.beginContact, this);
		this.body.onEndContact.add(this.endContact, this);
	}

	beginContact(bodyA: Phaser.Physics.P2.Body, bodyB: Phaser.Physics.P2.Body) {
		
		//world edge?
		if (!bodyA) {
			return;
		}

		let combatUnit = <CombatUnit>(<any>bodyA).combatUnit;
		if (combatUnit && this.player != combatUnit.player) {
			this.collidingWith.push(combatUnit);
		}
	}

	endContact(bodyA: Phaser.Physics.P2.Body, bodyB: Phaser.Physics.P2.Body) {
		//world edge?
		if (!bodyA) {
			return;
		}

		let combatUnit = <CombatUnit>(<any>bodyA).combatUnit;
		if (combatUnit) {
			let index = this.collidingWith.indexOf(combatUnit);

			if (index >= 0) {
				this.collidingWith.splice(index, 1);
			}
		}

	}

	update() {
		this.updateCollisionsAndDamage();

		this.updateMovement();
	}

	updateCollisionsAndDamage() {
		for (let i = this.collidingWith.length - 1; i >= 0; i--) {
			if (!this.collidingWith[i].body.sprite.alive) {
				this.collidingWith.splice(i, 1);
			}
		}

		if (this.collidingWith.length != 0) {
			let damage = 10 * this.game.time.physicsElapsed / this.collidingWith.length;

			for (let i = this.collidingWith.length - 1; i >= 0; i--) {
				let c = this.collidingWith[i];

				c.takeDamage(damage);
			}
		}

		super.update();
	}

	updateMovement() {

		if (this.target && !this.target.sprite.alive) {
			this.target = null;
		}

		this.performTargetUpdateIfRequired();

		if (!this.target) {
			return;
		}

		let xDiff = this.target.body.x - this.body.x;
		let yDiff = this.target.body.y - this.body.y;

		let dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

		xDiff /= dist;
		yDiff /= dist;

		let force = 30;
		this.body.applyForce([-xDiff * force, -yDiff * force], 0, 0);
	}

	private lastTargetCheckTime: number;
	performTargetUpdateIfRequired() {
		let needUpdate = false;

		if (this.game.time.now - this.lastTargetCheckTime > 500) {
			needUpdate = true;
		} else if (!this.target) {
			needUpdate = true;
		}

		if (!needUpdate) {
			return;
		}
		this.lastTargetCheckTime = this.game.time.now;

		let minDist = 9999999999;

		for (let i = 0; i < Globals.gameObjects.length; i++) {
			let o = Globals.gameObjects[i];

			if (!(o instanceof CombatUnit)) {
				continue;
			}
			let cu = <CombatUnit>o;
			
			//target filtering
			if (cu.player == this.player) {
				continue;
			}
			//TODO: can't attack flying? maybe we can ask if we collide with it?
			
			let dist = this.distanceTo(cu);
			if (dist < minDist) {
				this.target = cu;
				minDist = dist;
			}
		}
	}
}
export = MeleeUnit;
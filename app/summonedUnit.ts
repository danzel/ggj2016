import CombatUnit = require('./combatUnit');
import FlyingUnit = require('./flyingUnit');
import GameObject = require('./gameObject');
import Globals = require('./globals');
import Player = require('./player');
import Materials = require('./materials');
import SummonedUnitDef = require('./summonedUnitDef');

class SummonedUnit extends CombatUnit {
	collidingWith: Array<CombatUnit> = [];

	shadow: Phaser.Sprite;
	target: CombatUnit;

	constructor(protected game: Phaser.Game, player: Player, x: number, y: number, protected def: SummonedUnitDef) {
		super(game, player, def.health, player.id);

		this.sprite = def.layer.add(new Phaser.Sprite(game, x, y, def.sprite));
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;

		if (def.shadow) {
			this.shadow = new Phaser.Sprite(game, x, y, def.shadow.sprite);
			this.shadow.anchor.x = 0.5;
			this.shadow.anchor.y = 0.5;
			this.shadow.alpha = 0.5;
			def.layer.addAt(this.shadow, 0);
		}

		game.physics.p2.enable(this.sprite); //DEBUG ON HERE
		this.body = <Phaser.Physics.P2.Body>this.sprite.body;
		(<any>this.body).combatUnit = this;

		if (def.capsuleLength) {
			this.body.clearShapes();
			this.body.addCapsule(def.capsuleLength, def.size);
		} else {
			this.body.setCircle(def.size);
		}
		this.body.mass *= def.massMultiplier;
		this.body.damping = 0.9999;
		this.body.fixedRotation = true;
		this.body.setMaterial(Materials.groundUnitMaterial);

		this.body.setCollisionGroup(def.collisionGroup);
		
		//Be careful to put callback ones first (or don't put callback ones in the second array)
		//this.body.collides(Globals.lambCollisionGroup, this.lambCollision, this);

		this.body.collides(def.collidesWith);
		
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

		if (this.shadow) {
			this.shadow.angle = this.sprite.angle;
			this.shadow.x = this.sprite.x + this.def.shadow.x;
			this.shadow.y = this.sprite.y + this.def.shadow.y;
		}
		super.update();
	}

	updateCollisionsAndDamage() {
		for (let i = this.collidingWith.length - 1; i >= 0; i--) {
			if (!this.collidingWith[i].body.sprite || !this.collidingWith[i].body.sprite.alive) {
				this.collidingWith.splice(i, 1);
			}
		}

		if (this.collidingWith.length != 0) {
			let damage = this.def.dps * this.game.time.physicsElapsed / this.collidingWith.length;

			for (let i = this.collidingWith.length - 1; i >= 0; i--) {
				let c = this.collidingWith[i];

				c.takeDamage(damage);
			}
		}
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

		if (dist > this.def.desiredTargetDistance) {
			xDiff /= dist;
			yDiff /= dist;

			let force = this.def.movementForce;
			this.body.applyForce([-xDiff * force, -yDiff * force], 0, 0);
		}
		this.rotateSprite(-xDiff, -yDiff);
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

			if (!this.canAttack(cu)) {
				continue;
			}

			let dist = this.distanceTo(cu);
			if (dist < minDist) {
				this.target = cu;
				minDist = dist;
			}
		}
	}

	protected canAttack(cu: CombatUnit) {
		if ((<any>this).isFlying) {
			return true;
		}
		if ((<any>cu).isFlying) {
			return false;
		}
		return true;
	}
	
	onDead() {
		super.onDead();
		
		if (this.shadow) {
			this.shadow.destroy();
		}
	}
}
export = SummonedUnit;
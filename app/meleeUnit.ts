import CombatUnit = require('./combatUnit');
import GameObject = require('./gameObject');
import Globals = require('./globals');
import Player = require('./player');
import Materials = require('./materials');


class MeleeUnit implements CombatUnit {
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;

	health: number = 40;
	maxHealth: number = 40;

	collidingWith: Array<CombatUnit> = [];

	constructor(private game: Phaser.Game, private player: Player, x: number, y: number) {

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
		if (combatUnit) {
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
		for (let i = this.collidingWith.length - 1; i >= 0; i--) {
			if (!this.collidingWith[i].body.sprite.alive) {
				this.collidingWith.splice(i, 1);
			}
		}

		if (this.collidingWith.length == 0) {
			return;
		}

		let damage = 10 * this.game.time.physicsElapsed / this.collidingWith.length;

		for (let i = this.collidingWith.length - 1; i >= 0; i--) {
			let c = this.collidingWith[i];
			
			c.health -= damage;
			if (c.health <= 0) {
				c.sprite.destroy(); //TODO: effect
			}
		}
	}
}
export = MeleeUnit;
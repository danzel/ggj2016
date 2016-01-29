import CombatUnit = require('./combatUnit');
import GameObject = require('./gameObject');
import Globals = require('./globals');
import Harvester = require('./harvester');
import Lamb = require('./lamb');
import MeleeUnit = require('./meleeUnit');
import SacrificePit = require('./sacrificePit');

class Player implements CombatUnit {
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;

	maxHealth = 100;
	maxMana = 100;

	mana: number = 50;
	health: number = 100;

	sacrificePit: SacrificePit;
	followers: Array<Lamb> = [];
	springs: Array<Phaser.Physics.P2.Spring> = [];
	maxFollowers: number = 1;

	private buttonA = false;
	private buttonB = false;

	constructor(private game: Phaser.Game, public id: number, private gamepad: Phaser.SinglePad) {
		Globals.lambSacrificed.on((lamb) => this.lambSacrificed(lamb));

		if (id == 1) {
			this.sprite = game.add.sprite(100, 300, 'player2');
		} else {
			this.sprite = game.add.sprite(1280 - 100, 300, 'player2');
		}
		this.sprite.smoothed = false;
		this.sprite.scale.set(1.2);

		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;

		game.physics.p2.enable(this.sprite, true);
		this.body = <Phaser.Physics.P2.Body>this.sprite.body;
		(<any>this.body).player = this;
		(<any>this.body).combatUnit = this;

		this.body.setCircle(30);
		this.body.setZeroDamping();
		this.body.fixedRotation = true;

		this.body.setCollisionGroup(Globals.playerCollisionGroup);
		
		//Be careful to put callback ones first (or don't put callback ones in the second array)
		this.body.collides(Globals.lambCollisionGroup, this.lambCollision, this);

		this.body.collides([Globals.playerCollisionGroup, Globals.pitCollisionGroup, Globals.groundCreatureCollisionGroup]);
	}

	lambCollision(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body) {
		let lamb = <Lamb>(<any>body2).lamb;
		if (!lamb.beingDragged && this.followers.length < this.maxFollowers && this.followers.indexOf(lamb) == -1) {
			lamb.beingDragged = true;
			this.followers.push(lamb);

			this.springs.push(this.game.physics.p2.createSpring(body1, body2, 45, 100, 0.7));
		}
	}

	lambSacrificed(lamb: Lamb) {
		let index = this.followers.indexOf(lamb);
		if (index != -1) {
			this.followers.splice(index, 1);
			this.game.physics.p2.removeSpring(this.springs[index]);
			this.springs.splice(index, 1);
		}
	}

	addMana(amount: number) {
		this.mana += amount;
		if (this.mana > this.maxMana) {
			this.mana = this.maxMana;
		}
	}

	update() {
		//TODO: this means the player always has really good control, if we want them to be pushed around this won't work.
		this.body.setZeroVelocity();

		let x = this.gamepad.axis(0);
		let y = this.gamepad.axis(1);
		this.body.moveRight(x * 400);
		this.body.moveDown(y * 400);
		
		//Angle body based on desired movement direction
		if (x != 0 || y != 0) {
			var angle = Math.atan2(y, x) * 180 / Math.PI;
			this.sprite.angle = angle;
		}

		if (this.gamepad.connected) {
			let nowA = this.gamepad.getButton(Phaser.Gamepad.XBOX360_A).isDown;
			let justA = !this.buttonA && nowA;
			this.buttonA = nowA;


			let nowB = this.gamepad.getButton(Phaser.Gamepad.XBOX360_B).isDown;
			let justB = !this.buttonB && nowB;
			this.buttonB = nowB;

			if (justA && this.mana >= 1) {
				this.mana -= 30;
				let spawnX = this.sprite.x + 70 * Math.sin((this.sprite.angle + 90) * Math.PI / 180);
				let spawnY = this.sprite.y - 70 * Math.cos((this.sprite.angle + 90) * Math.PI / 180);
				Globals.gameObjects.push(new Harvester(this.game, this, spawnX, spawnY));
			}


			if (justB && this.mana >= 30) {
				this.mana -= 30;
				let spawnX = this.sprite.x + 70 * Math.sin((this.sprite.angle + 90) * Math.PI / 180);
				let spawnY = this.sprite.y - 70 * Math.cos((this.sprite.angle + 90) * Math.PI / 180);

				Globals.gameObjects.push(new MeleeUnit(this.game, this, spawnX, spawnY));
			}
		}
		
		
		//TODO: other controls...

		//this.sprite.body.force.x = this.gamepad.axis(0) * 100;
		//this.sprite.body.force.y = this.gamepad.axis(1) * 100;
		
		
		this.mana -= this.game.time.physicsElapsed * 2;
		if (this.mana < 0) {
			
			//TODO: gods are angry at you
			this.health += this.mana;
			this.mana = 0;
		}
	}

}

export = Player;
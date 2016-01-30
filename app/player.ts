import CombatUnit = require('./combatUnit');
import FlyingUnit = require('./flyingUnit');
import GameObject = require('./gameObject');
import Globals = require('./globals');
import Harvester = require('./harvester');
import Lamb = require('./lamb');
import Materials = require('./materials');
import MeleeUnit = require('./meleeUnit');
import SacrificePit = require('./sacrificePit');
import TankUnit = require('./tankUnit');

class Player extends CombatUnit {
	maxMana: number = 100;

	mana: number = 50;

	sacrificePit: SacrificePit;
	followers: Array<Lamb> = [];
	springs: Array<Phaser.Physics.P2.Spring> = [];
	maxFollowers: number = 1;

	gamepad: Phaser.SinglePad;
	private buttonA = false;
	private buttonB = false;
	private buttonX = false;
	private buttonY = false;

	constructor(private game: Phaser.Game, public id: number, private gamepadMain: Phaser.SinglePad, private gamepadAlt: Phaser.SinglePad) {
		super(game, null, 100, id); //fuck can't use this here, CombatUnit fixes this
		
		this.gamepad = this.gamepadMain;
		
		Globals.lambSacrificed.on((lamb) => this.lambSacrificed(lamb));

		if (id == 1) {
			this.sprite = Globals.layerGround.add(new Phaser.Sprite(game, 100, 300, 'player' + id));
		} else {
			this.sprite = Globals.layerGround.add(new Phaser.Sprite(game, 1280 - 100, 300, 'player' + id));
		}
		this.sprite.smoothed = false;
		this.sprite.scale.set(1.2);

		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;

		game.physics.p2.enable(this.sprite);
		this.body = <Phaser.Physics.P2.Body>this.sprite.body;
		this.body.setMaterial(Materials.groundUnitMaterial);
		(<any>this.body).player = this;
		(<any>this.body).combatUnit = this;

		this.body.setCircle(30);
		this.body.setZeroDamping();
		this.body.fixedRotation = true;

		this.body.setCollisionGroup(Globals.playerCollisionGroup);
		
		//Be careful to put callback ones first (or don't put callback ones in the second array)
		this.body.collides(Globals.lambCollisionGroup, this.lambCollision, this);

		this.body.collides([Globals.playerCollisionGroup, Globals.pitCollisionGroup, Globals.groundCreatureCollisionGroup, Globals.flyingSensorCollisionGroup]);
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
		
		this.rotateSprite(x, y);

		if (this.gamepad.connected) {
			let nowA = this.gamepad.getButton(Phaser.Gamepad.XBOX360_A).isDown;
			let justA = !this.buttonA && nowA;
			this.buttonA = nowA;

			let nowB = this.gamepad.getButton(Phaser.Gamepad.XBOX360_B).isDown;
			let justB = !this.buttonB && nowB;
			this.buttonB = nowB;

			let nowX = this.gamepad.getButton(Phaser.Gamepad.XBOX360_X).isDown;
			let justX = !this.buttonX && nowX;
			this.buttonX = nowX;

			let nowY = this.gamepad.getButton(Phaser.Gamepad.XBOX360_Y).isDown;
			let justY = !this.buttonY && nowY;
			this.buttonY = nowY;

			let spawnX = this.sprite.x + 70 * Math.sin((this.sprite.angle + 90) * Math.PI / 180);
			let spawnY = this.sprite.y - 70 * Math.cos((this.sprite.angle + 90) * Math.PI / 180);

			if (justA && this.mana >= 30) {
				this.mana -= 30;
				Globals.gameObjects.push(new Harvester(this.game, this, spawnX, spawnY));
			}


			if (justB && this.mana >= 30) {
				this.mana -= 30;

				Globals.gameObjects.push(new MeleeUnit(this.game, this, spawnX, spawnY));
			}
			
			if (justX && this.mana >= 30) {
				this.mana -= 30;

				Globals.gameObjects.push(new TankUnit(this.game, this, spawnX, spawnY));
			}

			if (justY && this.mana >= 30) {
				this.mana -= 30;

				Globals.gameObjects.push(new FlyingUnit(this.game, this, spawnX, spawnY));
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
		
		super.update();
	}
	
	swapGamepad() {
		if (this.gamepadAlt === null)
			return;
		var temp = this.gamepadMain;
		this.gamepadMain = this.gamepadAlt;
		this.gamepadAlt = temp;
		this.gamepad = this.gamepadMain;
	}
}

export = Player;
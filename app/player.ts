import CombatUnit = require('./combatUnit');
import FlyingUnit = require('./flyingUnit');
import GameObject = require('./gameObject');
import Globals = require('./globals');
import Harvester = require('./harvester');
import Lamb = require('./lamb');
import Materials = require('./materials');
import MeleeUnit = require('./meleeUnit');
import SacrificePit = require('./sacrificePit');
import ShootingUnit = require('./shootingUnit');
import SpamUnit = require('./spamUnit');
import TankUnit = require('./tankUnit');

class Player extends CombatUnit {
	maxMana: number = 100;

	mana: number = 50;

	sacrificePit: SacrificePit;
	followers: Array<Lamb> = [];
	springs: Array<Phaser.Physics.P2.Spring> = [];
	maxFollowers: number = 1;

	shadow: Phaser.Sprite;

	gamepad: Phaser.SinglePad;
	private buttonA = false;
	private buttonRightBumper = false;
	private buttonLeftBumper = false;
	selectedItem: number = 0;

	timeBuildVisible: number = 9999;

	constructor(private game: Phaser.Game, public id: number, private gamepadMain: Phaser.SinglePad, private gamepadAlt: Phaser.SinglePad) {
		super(game, null, 100, id); //fuck can't use this here, CombatUnit fixes this
		
		this.gamepad = this.gamepadMain;

		Globals.lambSacrificed.on((lamb) => this.lambSacrificed(lamb));

		if (id == 1) {
			this.sprite = Globals.layerGround.add(new Phaser.Sprite(game, 100, 300, 'player' + id));
		} else {
			this.sprite = Globals.layerGround.add(new Phaser.Sprite(game, 1280 - 100, 300, 'player' + id));
		}
		this.sprite.animations.add('walk', [0, 1, 2, 1], 4, true);
		this.sprite.animations.play('walk');

		this.sprite.smoothed = false;
		this.sprite.scale.set(1.2);

		this.shadow = new Phaser.Sprite(game, this.sprite.x, this.sprite.y, 'shadow-player');
		this.shadow.anchor.x = 0.5;
		this.shadow.anchor.y = 0.5;
		this.shadow.alpha = 0.5;
		Globals.layerGround.addAt(this.shadow, 0);
		this.shadow.scale.set(1.2);


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

		if (this.gamepad.connected) {
			this.gamepad.deadZone = 0.1;
			this.updateControls();
		}

		this.mana -= this.game.time.physicsElapsed * 1;
		if (this.mana < 0) {
			
			//TODO: gods are angry at you
			this.health += this.mana;
			this.mana = 0;
		}

		super.update();
	}

	private updateControls() {
		this.updatePlayerControls();
		this.updateBuildControls();

		this.timeBuildVisible += this.game.time.physicsElapsed;
	}

	private updatePlayerControls() {
		let x = this.gamepad.axis(0);
		let y = this.gamepad.axis(1);
		this.body.moveRight(x * 400);
		this.body.moveDown(y * 400);

		this.rotateSprite(x, y);

		this.shadow.angle = this.sprite.angle;
		this.shadow.x = this.sprite.x + 3;
		this.shadow.y = this.sprite.y + 3;

		let nowA = this.gamepad.getButton(Phaser.Gamepad.XBOX360_A).isDown;
		let justA = !this.buttonA && nowA;
		this.buttonA = nowA;

		if (justA) {
			this.tryBuild();
		}
	}

	private updateBuildControls() {
		let nowRB = this.gamepad.getButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER).isDown;
		let justRB = !this.buttonRightBumper && nowRB;
		this.buttonRightBumper = nowRB;

		let nowLB = this.gamepad.getButton(Phaser.Gamepad.XBOX360_LEFT_BUMPER).isDown;
		let justLB = !this.buttonLeftBumper && nowLB;
		this.buttonLeftBumper = nowLB;

		if (justLB) {
			this.selectedItem = (this.selectedItem + 5) % 6;
			this.timeBuildVisible = 0;
		}
		if (justRB) {
			this.selectedItem = (this.selectedItem + 1) % 6;
			this.timeBuildVisible = 0;
		}

		let x = this.gamepad.axis(2);
		let y = this.gamepad.axis(3);

		let dist = Math.sqrt(x * x + y * y);
		if (dist > 0.5) {
			let angle = Math.atan2(y, x) * 180 / Math.PI;
			angle += 90;
			angle = (angle + 360) % 360;
			console.log(angle);
			
			let index = Math.floor((angle + (360 / 12)) / (360 / 6)) % 6;
			console.log(index);
			
			this.selectedItem = index;
			this.timeBuildVisible = 0;
		}
	}

	private tryBuild() {
		var bought = false;
		let spawnX = this.sprite.x + 70 * Math.sin((this.sprite.angle + 90) * Math.PI / 180);
		let spawnY = this.sprite.y - 70 * Math.cos((this.sprite.angle + 90) * Math.PI / 180);

		switch (this.selectedItem) {
			case 0:
				if (this.mana >= 30) {
					bought = true;
					this.mana -= 30;
					Globals.gameObjects.push(new Harvester(this.game, this, spawnX, spawnY));
				}
				break;
			case 1:
				if (this.mana >= 30) {
					bought = true;
					this.mana -= 30;
					Globals.gameObjects.push(new SpamUnit(this.game, this, spawnX + 10, spawnY + 10));
					Globals.gameObjects.push(new SpamUnit(this.game, this, spawnX - 10, spawnY + 10));
					Globals.gameObjects.push(new SpamUnit(this.game, this, spawnX + 10, spawnY - 10));
					Globals.gameObjects.push(new SpamUnit(this.game, this, spawnX - 10, spawnY - 10));
				}
				break;
			case 2:
				if (this.mana >= 30) {
					bought = true;
					this.mana -= 30;
					Globals.gameObjects.push(new MeleeUnit(this.game, this, spawnX, spawnY));
				}
				break;
			case 3:
				if (this.mana >= 30) {
					bought = true;
					this.mana -= 30;
					Globals.gameObjects.push(new TankUnit(this.game, this, spawnX, spawnY));
				}
				break;
			case 4:
				if (this.mana >= 30) {
					bought = true;
					this.mana -= 30;
					Globals.gameObjects.push(new FlyingUnit(this.game, this, spawnX, spawnY));
				}
				break;
			case 5:
				if (this.mana >= 30) {
					bought = true;
					this.mana -= 30;
					Globals.gameObjects.push(new ShootingUnit(this.game, this, spawnX, spawnY));
				}
				break;
		}
		if (bought) {
			this.timeBuildVisible = 999;
		}
		//TODO: Use bought?
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
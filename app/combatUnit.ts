import GameObject = require('./gameObject');
import Globals = require('./globals');
import HealthBar = require('./healthBar');
import Player = require('./player');

class CombatUnit implements GameObject {
	health: number;
	maxHealth: number;
	graphics: Phaser.Graphics;
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;
	healthBar: HealthBar;
	player: Player;

	constructor(game: Phaser.Game, player: Player, maxHealth: number, playerNumber: number) {
		this.graphics = Globals.layerUi.add(new Phaser.Graphics(game));
		this.player = player || (<Player><any>this);
		this.maxHealth = maxHealth;
		this.health = this.maxHealth;
		this.healthBar = new HealthBar(this.graphics, 50, 7, 1, playerNumber, false, playerNumber == 2, 0, 0);
		
		//if (!(this.player instanceof Player)) {
		//	debugger; //you fucked up
		//}
	}

	distanceTo(other: CombatUnit) {
		let x = this.body.x - other.body.x;
		let y = this.body.y - other.body.y;

		return Math.sqrt(x * x + y * y);
	}

	rotateSprite(x: number, y: number) {
		//Angle body based on desired movement direction
		if (x != 0 || y != 0) {
			var angle = Math.atan2(y, x) * 180 / Math.PI;
			this.sprite.angle = angle;
		}
	}

	update() {
		this.graphics.clear();
		this.graphics.x = this.sprite.x - 25;
		this.graphics.y = this.sprite.y - 45;
		this.healthBar.draw(this.health, this.maxHealth);
	}

	takeDamage(damage: number) {
		this.health -= damage;
		Globals.addBloodSplatter(this.sprite.x + Math.random() * 30 - 15, this.sprite.y + Math.random() * 30 - 15, 400, 1);
		Globals.soundscape.addAttack();
		if (this.health <= 0) {
			this.preDie();
			this.sprite.destroy(); //TODO: effect
			this.graphics.destroy();

			this.onDead();
		}
	}

	preDie() {
		//Override in child classes
	}
	onDead() {
		//Override in child classes
	}
}

export = CombatUnit;
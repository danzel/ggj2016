import GameObject = require('./gameObject');
import Player = require('./player');

class CombatUnit implements GameObject {
	health: number;
	maxHealth: number;
	graphics: Phaser.Graphics;
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;
	player: Player;

	constructor(game: Phaser.Game, player: Player, maxHealth: number) {
		this.graphics = game.add.graphics(0, 0);
		this.player = player || (<Player><any>this);
		this.maxHealth = maxHealth;
		this.health = this.maxHealth;
		
		//if (!(this.player instanceof Player)) {
		//	debugger; //you fucked up
		//}
	}

	distanceTo(other: CombatUnit) {
		let x = this.body.x - other.body.x;
		let y = this.body.y - other.body.y;

		return Math.sqrt(x * x + y * y);
	}

	update() {
		this.graphics.clear();
		this.graphics.x = this.sprite.x - 25;
		this.graphics.y = this.sprite.y - 45;
		// health bar
		const barWidth = 50;
		var healthWidth = this.health / this.maxHealth * barWidth;
		this.graphics.beginFill(0x60120B);
		this.graphics.drawRect(0, 0, barWidth, 7);
		this.graphics.beginFill(0xE52C1B);
		this.graphics.drawRect(0, 0, healthWidth, 7);
	}

	takeDamage(damage: number) {
		this.health -= damage;
		if (this.health <= 0) {
			this.sprite.destroy(); //TODO: effect
		}

	}
}

export = CombatUnit;
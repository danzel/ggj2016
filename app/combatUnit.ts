import GameObject = require('./gameObject');

class CombatUnit implements GameObject {
	health: number;
	maxHealth: number;
	graphics: Phaser.Graphics;
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;
	
	constructor(game: Phaser.Game) {
		this.graphics = game.add.graphics(0, 0);
	}
	
	update() {
		this.graphics.clear();
		this.graphics.x = this.sprite.x - 25;
		this.graphics.y = this.sprite.y - 45;
		// health bar
		const barWidth = 50;
		var healthWidth = this.health / this.maxHealth * barWidth;
		this.graphics.beginFill(0x60120B);
		this.graphics.drawRoundedRect(0, 0, barWidth, 7, 1);
		this.graphics.beginFill(0xE52C1B);
		this.graphics.drawRoundedRect(0, 0, healthWidth, 7, 1);		
	}
}

export = CombatUnit;
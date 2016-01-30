class HealthBar {
	graphics: Phaser.Graphics;
	width: number;
	height: number;
	radius: number;
	backColour: number;
	frontColour: number;
	backwards: boolean;
	x: number;
	y: number;
	
	constructor(graphics: Phaser.Graphics, width: number, height: number, radius: number, playerNumber: number, mana: boolean, backwards: boolean, x: number, y: number) {
		this.graphics = graphics;
		this.width = width;
		this.height = height;
		this.radius = radius;
		if (playerNumber == 1) {
			if (mana) {
				this.backColour = 0x3E0F54;
				this.frontColour = 0xAC36E2;
			} else {
				this.backColour = 0x540825;
				this.frontColour = 0xE5296E;
			}
		} else if (playerNumber == 2) {
			if (mana) {
				this.backColour = 0x07353D;
				this.frontColour = 0x28B3CC;
			} else {
				this.backColour = 0x191060;
				this.frontColour = 0x4147EA;
			}
		}
		this.backwards = backwards;
		this.x = x;
		this.y = y;
	}
	
	draw(health: number, maxHealth: number) {
		var healthWidth = Math.round(health / maxHealth * this.width);
		if (healthWidth < 0)
			healthWidth = 0;
		var radius = this.radius;
		var yOffset = 0;
		if (healthWidth > 0 && healthWidth < this.radius * 2 + 1) {
			radius = Math.floor((healthWidth - 1) / 2);
			yOffset = this.radius - radius;
		}
		this.graphics.beginFill(this.backColour);
		this.graphics.drawRoundedRect(this.x, this.y, this.width, this.height, this.radius);
		if (healthWidth != 0) {
			this.graphics.beginFill(this.frontColour);
			var startX = this.backwards ? this.x + this.width - healthWidth : this.x;
			if (radius < 1)
				this.graphics.drawRect(startX, this.y + yOffset, healthWidth, this.height - yOffset * 2);
			else
				this.graphics.drawRoundedRect(startX, this.y + yOffset, healthWidth, this.height - yOffset * 2, radius);
		}
	}
}

export = HealthBar;
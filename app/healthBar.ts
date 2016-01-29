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
	
	constructor(graphics: Phaser.Graphics, width: number, height: number, radius: number, backColour: number, frontColour: number, backwards: boolean, x: number, y: number) {
		this.graphics = graphics;
		this.width = width;
		this.height = height;
		this.radius = radius;
		this.backColour = backColour;
		this.frontColour = frontColour;
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
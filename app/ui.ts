class Ui {
	sprite: Phaser.Sprite;
	
	constructor(private game: Phaser.Game) {
		var graphics = game.add.graphics(0, 0);
		// player 1 mana
		graphics.beginFill(0x191060);
		graphics.drawRoundedRect(50, 30, 230, 25, 3);
		graphics.beginFill(0x442BFF);
		graphics.drawRoundedRect(50, 30, 150, 25, 3);

		// player 1 health
		graphics.beginFill(0x60120B);
		graphics.drawRoundedRect(50, 70, 230, 25, 3);
		graphics.beginFill(0xE52C1B);
		graphics.drawRoundedRect(50, 70, 130, 25, 3);

		// player 2 mana
		graphics.beginFill(0x191060);
		graphics.drawRoundedRect(1000, 30, 230, 25, 3);
		graphics.beginFill(0x442BFF);
		graphics.drawRoundedRect(1000 + 230 - 150, 30, 150, 25, 3);

		// player 2 health
		graphics.beginFill(0x60120B);
		graphics.drawRoundedRect(1000, 70, 230, 25, 3);
		graphics.beginFill(0xE52C1B);
		graphics.drawRoundedRect(1000 + 230 - 130, 70, 130, 25, 3);
	}
}

export = Ui
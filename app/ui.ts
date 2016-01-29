import Player = require('./player');

class Ui {
	game: Phaser.Game;
	players: Array<Player>;
	graphics: Phaser.Graphics;
	
	constructor(private gameArg: Phaser.Game, private playersArg: Array<Player>) {
		this.game = gameArg;
		this.players = playersArg;
		this.graphics = this.game.add.graphics(0, 0);
	}
	
	update() {
		this.graphics.clear();
		
		const barWidth = 230;
		var p1ManaWidth = this.players[0].mana / 100 * barWidth;
		var p1HealthWidth = this.players[0].health / 100 * barWidth;
		var p2ManaWidth = this.players[1].mana / 100 * barWidth;
		var p2HealthWidth = this.players[1].health / 100 * barWidth;
		
		// player 1 mana
		this.graphics.beginFill(0x191060);
		this.graphics.drawRoundedRect(50, 20, barWidth, 25, 3);
		this.graphics.beginFill(0x442BFF);
		this.graphics.drawRoundedRect(50, 20, p1ManaWidth, 25, 3);

		// player 1 health
		this.graphics.beginFill(0x60120B);
		this.graphics.drawRoundedRect(50, 60, barWidth, 25, 3);
		this.graphics.beginFill(0xE52C1B);
		this.graphics.drawRoundedRect(50, 60, p1HealthWidth, 25, 3);

		// player 2 mana
		this.graphics.beginFill(0x191060);
		this.graphics.drawRoundedRect(1280 - 50 - barWidth, 20, barWidth, 25, 3);
		this.graphics.beginFill(0x442BFF);
		this.graphics.drawRoundedRect(1280 - 50 - p2ManaWidth, 20, p2ManaWidth, 25, 3);

		// player 2 health
		this.graphics.beginFill(0x60120B);
		this.graphics.drawRoundedRect(1280 - 50 - barWidth, 60, barWidth, 25, 3);
		this.graphics.beginFill(0xE52C1B);
		this.graphics.drawRoundedRect(1280 - 50 - p2HealthWidth, 60, p2HealthWidth, 25, 3);
	}
}

export = Ui
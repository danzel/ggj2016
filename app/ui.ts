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
		var p1ManaWidth = this.players[0].mana / this.players[0].maxMana * barWidth;
		var p1HealthWidth = this.players[0].health / this.players[0].maxHealth * barWidth;
		var p2ManaWidth = this.players[1].mana / this.players[1].maxMana * barWidth;
		var p2HealthWidth = this.players[1].health / this.players[1].maxHealth * barWidth;
		
		//TODO: maybe we draw 7 when we are at 0 and scale to match instead of these hacks. sorry thanks
		if (p1ManaWidth < 7 && p1ManaWidth > 0) {
			p1ManaWidth = 7;
		}
		if (p1HealthWidth < 7 && p1HealthWidth > 0) {
			p1HealthWidth = 7;
		}
		if (p2ManaWidth < 7 && p2ManaWidth > 0) {
			p2ManaWidth = 7;
		}
		if (p2HealthWidth < 7 && p2HealthWidth > 0) {
			p2HealthWidth = 7;
		}
		
		// player 1 mana
		this.graphics.beginFill(0x191060);
		this.graphics.drawRoundedRect(50, 20, barWidth, 25, 3);
		if (p1ManaWidth > 0) {
			this.graphics.beginFill(0x442BFF);
			this.graphics.drawRoundedRect(50, 20, p1ManaWidth, 25, 3);
		}
		
		// player 1 health
		this.graphics.beginFill(0x60120B);
		this.graphics.drawRoundedRect(50, 60, barWidth, 25, 3);
		if (p1HealthWidth > 0) {
			this.graphics.beginFill(0xE52C1B);
			this.graphics.drawRoundedRect(50, 60, p1HealthWidth, 25, 3);
		}

		// player 2 mana
		this.graphics.beginFill(0x191060);
		this.graphics.drawRoundedRect(1280 - 50 - barWidth, 20, barWidth, 25, 3);
		if (p2ManaWidth > 0) {
			this.graphics.beginFill(0x442BFF);
			this.graphics.drawRoundedRect(1280 - 50 - p2ManaWidth, 20, p2ManaWidth, 25, 3);
		}
		
		// player 2 health
		this.graphics.beginFill(0x60120B);
		this.graphics.drawRoundedRect(1280 - 50 - barWidth, 60, barWidth, 25, 3);
		if (p2HealthWidth > 0) {
			this.graphics.beginFill(0xE52C1B);
			this.graphics.drawRoundedRect(1280 - 50 - p2HealthWidth, 60, p2HealthWidth, 25, 3);
		}
	}
}

export = Ui
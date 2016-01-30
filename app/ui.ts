import HealthBar = require('./healthBar');
import Player = require('./player');

class Ui {
	game: Phaser.Game;
	players: Array<Player>;
	graphics: Phaser.Graphics;
	p1Mana: HealthBar;
	p1Health: HealthBar;
	p2Mana: HealthBar;
	p2Health: HealthBar;

	constructor(private gameArg: Phaser.Game, private playersArg: Array<Player>) {
		this.game = gameArg;
		this.players = playersArg;
		this.graphics = this.game.add.graphics(0, 0);
		const barWidth = 230;
		this.p1Mana = new HealthBar(this.graphics, barWidth, 22, 3, 1, true, false, 50, 20);
		this.p1Health = new HealthBar(this.graphics, barWidth, 22, 3, 1, false, false, 50, 55);
		this.p2Mana = new HealthBar(this.graphics, barWidth, 22, 3, 2, true, true, 1280 - 50 - barWidth, 20);
		this.p2Health = new HealthBar(this.graphics, barWidth, 22, 3, 2, false, true, 1280 - 50 - barWidth, 55);
	}

	update() {
		this.graphics.clear();

		this.p1Mana.draw(this.players[0].mana, this.players[0].maxMana);
		this.p1Health.draw(this.players[0].health, this.players[0].maxHealth);
		this.p2Mana.draw(this.players[1].mana, this.players[1].maxMana);
		this.p2Health.draw(this.players[1].health, this.players[1].maxHealth);
	}
}

export = Ui
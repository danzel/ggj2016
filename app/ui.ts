import BuildUi = require('./buildUi');
import HealthBar = require('./healthBar');
import Player = require('./player');

class Ui {
	game: Phaser.Game;
	players: Array<Player>;
	graphics: Phaser.Graphics;
	p1BuildUi: BuildUi;
	p2BuildUi: BuildUi;
	
	p1HealthSpriteBar: SpriteBar;
	p1ManaSpriteBar: SpriteBar;

	p2HealthSpriteBar: SpriteBar;
	p2ManaSpriteBar: SpriteBar;

	constructor(game: Phaser.Game, players: Array<Player>) {
		this.game = game;
		this.players = players;
		
		this.game.add.sprite(0, 0, 'healthmanabg1');
		this.game.add.sprite(1280 - 286, 0, 'healthmanabg2');
		this.graphics = this.game.add.graphics(0, 0);
		const barWidth = 230;
		
		this.p1ManaSpriteBar = new SpriteBar(this.game, 'manabar', 16, 6, 258, () => this.players[0].mana / this.players[0].maxMana);
		this.p1HealthSpriteBar = new SpriteBar(this.game, 'healthbar', 6, 44, 193, () => this.players[0].health / this.players[0].maxHealth);
		
		this.p2ManaSpriteBar = new SpriteBar(this.game, 'manabar', 1280 - 16, 6 + 33, 258, () => this.players[1].mana / this.players[1].maxMana);
		this.p2ManaSpriteBar.sprite.angle = 180;
		this.p2HealthSpriteBar = new SpriteBar(this.game, 'healthbar', 1280 - 6, 44 + 32, 193, () => this.players[1].health / this.players[1].maxHealth);
		this.p2HealthSpriteBar.sprite.angle = 180;
		
		
		this.p1BuildUi = new BuildUi(game, this.players[0]);
		this.p2BuildUi = new BuildUi(game, this.players[1]);
	}

	update() {
		this.graphics.clear();
		
		this.p1HealthSpriteBar.update();
		this.p1ManaSpriteBar.update();
		this.p2HealthSpriteBar.update();
		this.p2ManaSpriteBar.update();

		this.p1BuildUi.update();
		this.p2BuildUi.update();
	}
}

class SpriteBar {
	sprite: Phaser.Sprite;
	
	constructor(game: Phaser.Game, key: string, private x: number, y: number, private width: number, private valueGetter: () => number)	 {
		this.sprite = game.add.sprite(x, y, key);
	}
	
	update() {
		var value = this.valueGetter();
		
		var width = this.width * value;
		
		//this.sprite.x = this.x - this.width + width;
		
		this.sprite.crop(new Phaser.Rectangle(this.width - width, 0, width, 999), false);
	}
};

export = Ui
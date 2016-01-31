import Globals = require('./globals');
import Player = require('./player');

class GGHandler {

	constructor(private game: Phaser.Game, private players: Array<Player>) {

	}

	isGG: boolean;

	update() {
		if (this.isGG) { return; }

		if (this.players[0].health <= 0) {
			this.showGG('win2');
		}
		if (this.players[1].health <= 0) {
			this.showGG('win1');
		}
	}

	showGG(key: string) {
		this.isGG = true;

		let bg = new Phaser.Graphics(this.game, 0, 0);
		bg.beginFill(0x000000, 0.5);
		bg.drawRect(0, 0, 1280, 720);
		bg.endFill();
		Globals.layerUi.add(bg);

		let sprite = new Phaser.Sprite(this.game, 1280 / 2, 720 / 2, key)
		sprite.anchor.set(0.5);
		sprite.scale.set(0);
		Globals.layerUi.add(sprite);


		let t1 = this.game.add.tween(sprite.scale)
			.to({ x: 2, y: 2 }, 1000, 'Cubic.easeIn');

		let t2 = this.game.add.tween(sprite.scale)
			.to({ x: 1.5, y: 1.5 }, 1000, 'Cubic.easeOut');
			
		t1.chain(t2);
		t1.start();

		bg.alpha = 0;
		this.game.add.tween(bg)
			.to({ alpha: 1 }, 1000)
			.start();
	}
}

export = GGHandler;
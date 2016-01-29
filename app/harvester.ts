import GameObject = require('./gameObject');
import Globals = require('./globals');
import Player = require('./player');

class Harvester implements GameObject {
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;
	
	constructor(private game: Phaser.Game, private player: Player, x: number, y: number) {

		this.sprite = game.add.sprite(x, y);
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
	
		game.physics.p2.enable(this.sprite, true);
		this.body = <Phaser.Physics.P2.Body>this.sprite.body;
		//(<any>this.body).player = this;
		this.body.setCircle(20);
		this.body.setZeroDamping();
		this.body.fixedRotation = true;
	}
	
	update() {
		
	}
}

export = Harvester;

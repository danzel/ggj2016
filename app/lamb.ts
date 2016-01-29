import GameObject = require('./gameObject');
import Globals = require('./globals');


//Note: Not an actual lamb


class Lamb implements GameObject {
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;
	
	beingDragged: boolean;

	constructor(private game: Phaser.Game, x: number, y: number) { //TODO: Type
		
		this.sprite = game.add.sprite(x, y, 'sheeple');
		this.sprite.smoothed = false;
		this.sprite.scale.set(1.3);

		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		game.physics.p2.enable(this.sprite, false);
		this.body = <Phaser.Physics.P2.Body>this.sprite.body;

		this.body.setCircle(20);
		this.body.damping = 0.9;
		this.body.fixedRotation = true;


		this.body.setCollisionGroup(Globals.lambCollisionGroup);
		this.body.collides([Globals.playerCollisionGroup, Globals.lambCollisionGroup, Globals.pitCollisionGroup, Globals.groundCreatureCollisionGroup]);

		//TODO: When we collide with the pit we need to get collected too
		(<any>this.body).lamb = this;
	}
	
	update() {
		if (this.body.velocity.x > 0) {
			this.body.sprite.scale.x = 1;
		} else if (this.body.velocity.x < 0) {
			this.body.sprite.scale.x = -1;
		}
	}
}

export = Lamb;
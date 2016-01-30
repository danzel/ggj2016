import GameObject = require('./gameObject');
import Globals = require('./globals');


//Note: Not an actual lamb


class Lamb implements GameObject {
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;

	beingDragged: boolean;

	shadow: Phaser.Sprite;

	constructor(private game: Phaser.Game, x: number, y: number) { //TODO: Type
		
		this.sprite = Globals.layerGround.add(new Phaser.Sprite(game, x, y, 'sheeple-walk'));
		this.sprite.animations.add('walk', [0, 1], 4, true);

		this.sprite.smoothed = false;
		this.sprite.scale.set(1.3);
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;

		this.shadow = new Phaser.Sprite(game, x, y, 'shadow-sheeple');
		this.shadow.anchor.x = 0.5;
		this.shadow.anchor.y = 0.5;
		this.shadow.alpha = 0.5;
		Globals.layerGround.addAt(this.shadow, 0);


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

	walking = false;

	update() {
		if (this.body.velocity.x > 0) {
			this.body.sprite.scale.x = 1;
		} else if (this.body.velocity.x < 0) {
			this.body.sprite.scale.x = -1;
		}

		if (!this.beingDragged) {
			this.sprite.angle = 0;
		}

		let abs = Math.sqrt(this.body.velocity.x * this.body.velocity.x + this.body.velocity.y * this.body.velocity.y);
		if (abs > 2 && !this.walking) {
			this.walking = true;
			this.sprite.animations.play('walk', 4, true);
		} else if (abs <= 2 && this.walking) {
			this.walking = false;
			this.sprite.animations.stop('walk', true);
		}
		
		
		this.shadow.angle = this.sprite.angle;
		this.shadow.x = this.sprite.x;
		this.shadow.y = this.sprite.y + 18;
	}
}

export = Lamb;
import GameObject = require('./gameObject');
import Globals = require('./globals');


//Note: Not an actual lamb


class Lamb implements GameObject {
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;

	beingDragged: boolean;

	shadow: Phaser.Sprite;

	constructor(private game: Phaser.Game, x: number, y: number) { //TODO: Type
		
		this.sprite = Globals.layerGround.add(new Phaser.Sprite(game, x, y, 'sheeple-new'));
		this.sprite.animations.add('down', [0, 1, 2, 1], 4, true);
		this.sprite.animations.add('left', [3, 4, 5, 4], 4, true);
		this.sprite.animations.add('right', [6, 7, 8, 7], 4, true);
		this.sprite.animations.add('up', [9, 10, 11, 10], 4, true);
		this.sprite.animations.add('standing', [1], 4, true);
		this.ensureAnimation('standing');

		//this.sprite.smoothed = false;
		//this.sprite.scale.set(1.3);
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

	animation = '';

	update() {

		let abs = Math.sqrt(this.body.velocity.x * this.body.velocity.x + this.body.velocity.y * this.body.velocity.y);
		
		if (abs > 2) {
			
			if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
				if (this.body.velocity.x > 0) {
					this.ensureAnimation('right');
				} else {
					this.ensureAnimation('left');
				}
			} else {
				if (this.body.velocity.y > 0) {
					this.ensureAnimation('down');
				} else {
					this.ensureAnimation('up');
				}
			}
		} else {
			this.ensureAnimation('standing');
		}


		this.shadow.angle = this.sprite.angle;
		this.shadow.x = this.sprite.x;
		this.shadow.y = this.sprite.y + 18;
	}
	
	ensureAnimation(anim: string) {
		if (this.animation == anim) { 
			return;
		}
		
		this.sprite.animations.play(anim, 4, true);
		this.animation = anim;
	}
}

export = Lamb;
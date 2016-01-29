class Player {
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;
	
	mana: number = 50;
	health: number = 100;

	constructor(private game: Phaser.Game, public id: number, private gamepad: Phaser.SinglePad) {

		if (id == 1) {
			this.sprite = game.add.sprite(100, 300, 'test');
		} else {
			this.sprite = game.add.sprite(1280 - 100, 300, 'test');
		}
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		
		game.physics.p2.enable(this.sprite, true);
		this.body = <Phaser.Physics.P2.Body>this.sprite.body;
		
		this.body.setCircle(30);
		this.body.setZeroDamping();
		this.body.fixedRotation = true;
	}
	
	update() {
		//TODO: this means the player always has really good control, if we want them to be pushed around this won't work.
		this.body.setZeroVelocity();
		this.body.moveRight(this.gamepad.axis(0) * 400);
		this.body.moveDown(this.gamepad.axis(1) * 400);
		
		//TODO: other controls...

		//this.sprite.body.force.x = this.gamepad.axis(0) * 100;
		//this.sprite.body.force.y = this.gamepad.axis(1) * 100;
	}

}

export = Player;
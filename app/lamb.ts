//Note: Not an actual lamb


class Lamb {
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;

	constructor(private game: Phaser.Game, x: number, y: number) { //TODO: Type
		
		this.sprite = game.add.sprite(x, y); //TODO: Sprite
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		game.physics.p2.enable(this.sprite, true);
		this.body = <Phaser.Physics.P2.Body>this.sprite.body;

		this.body.setCircle(20);
		this.body.damping = 0.9;

	}
}

export = Lamb;
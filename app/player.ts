class Player {
	x: number;
	y: number; //or physics body?
	sprite: Phaser.Sprite;
	
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
		
		//TODO controls gamepad.addCallbacks
	}

}

export = Player;
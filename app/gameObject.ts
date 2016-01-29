interface GameObject {
	
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;
	
	update();
}

export = GameObject;
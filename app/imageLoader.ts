class ImageLoader {
	static load(game: Phaser.Game) {
		game.load.image('test', 'img/test.png');
		game.load.image('bg', 'img/bg.jpg');
		game.load.image('altar2', 'img/altar-2.png');
	}
}

export = ImageLoader;
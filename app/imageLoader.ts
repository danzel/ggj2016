class ImageLoader {
	static load(game: Phaser.Game) {
		game.load.image('test', 'img/test.png');
	}
}

export = ImageLoader;
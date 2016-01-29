class ImageLoader {
	static load(game: Phaser.Game) {
		game.load.image('test', 'img/test.png');
		game.load.image('bg', 'img/bg.jpg');
		game.load.image('altar2', 'img/altar-2.png');
		game.load.image('player2', 'img/d-monarch.png');
		game.load.image('warrior2', 'img/d-warrior.png');
		game.load.image('sheeple', 'img/sheeple.png');
	}
}

export = ImageLoader;
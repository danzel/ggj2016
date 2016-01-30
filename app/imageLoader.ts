class ImageLoader {
	static load(game: Phaser.Game) {
		game.load.image('test', 'img/test.png');
		game.load.image('bg', 'img/bg.jpg');
		game.load.image('sheeple', 'img/sheeple.png');
		

		game.load.image('altar1', 'img/altar-3.png');
		game.load.image('player1', 'img/h-monarch.png');
		game.load.image('warrior1', 'img/h-warrior.png');
		game.load.image('tank1', 'img/h-tank.png');
		game.load.image('flying1', 'img/h-harpy.png');
		game.load.image('harvester1', 'img/h-thrall.png');
		game.load.image('spam1', 'img/d-shoal.png');
		game.load.image('thrower1', 'img/d-thrower.png');
		
		game.load.image('altar2', 'img/altar-2.png');
		game.load.image('player2', 'img/d-monarch.png');
		game.load.image('warrior2', 'img/d-warrior.png');
		game.load.image('tank2', 'img/d-tank.png');
		game.load.image('flying2', 'img/d-harpy.png');
		game.load.image('harvester2', 'img/d-thrall.png');
		
		game.load.image('spam2', 'img/d-shoal.png');
		game.load.image('thrower2', 'img/d-thrower.png');
		
		game.load.image('flyingshadow', 'img/harpyshadow.png');
		game.load.image('blood', 'img/blood.png');
	}
}

export = ImageLoader;
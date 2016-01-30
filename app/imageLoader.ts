class ImageLoader {
	static load(game: Phaser.Game) {
		game.load.image('test', 'img/test.png');
		game.load.image('bg', 'img/bg.jpg');
		game.load.image('sheeple', 'img/sheeple.png');
		

		game.load.image('altar1', 'img/creeps/t1-altar.png');
		game.load.image('player1', 'img/creeps/t1-monarch.png');
		game.load.image('warrior1', 'img/creeps/t1-warrior.png');
		game.load.image('tank1', 'img/creeps/t1-tank.png');
		game.load.image('flying1', 'img/creeps/t1-harpy.png');
		game.load.image('harvester1', 'img/creeps/t1-thrall.png');
		game.load.image('spam1', 'img/creeps/t1-shoal.png');
		game.load.image('thrower1', 'img/creeps/t1-thrower.png');
		
		game.load.image('altar2', 'img/creeps/t2-altar.png');
		game.load.image('player2', 'img/creeps/t2-monarch.png');
		game.load.image('warrior2', 'img/creeps/t2-warrior.png');
		game.load.image('tank2', 'img/creeps/t2-tank.png');
		game.load.image('flying2', 'img/creeps/t2-harpy.png');
		game.load.image('harvester2', 'img/creeps/t2-thrall.png');
		game.load.image('spam2', 'img/creeps/t2-shoal.png');
		game.load.image('thrower2', 'img/creeps/t2-thrower.png');
		
		game.load.image('flyingshadow', 'img/harpyshadow.png');
		game.load.image('blood', 'img/blood.png');
		game.load.image('shot', 'img/creeps/t2-thrower-attk.png');
	}
}

export = ImageLoader;
class ImageLoader {
	static load(game: Phaser.Game) {
		game.load.image('bg', 'img/bg.jpg');
		game.load.image('sheeple', 'img/sheeple.png');
		

		game.load.image('altar1', 'img/creeps/t1-altar.png');
		game.load.spritesheet('player1', 'img/creeps/t1-monarch-a.png', 92, 64);
		game.load.image('warrior1', 'img/creeps/t1-warrior.png');
		game.load.image('tank1', 'img/creeps/t1-tank.png');
		game.load.image('flying1', 'img/creeps/t1-harpy.png');
		game.load.image('harvester1', 'img/creeps/t1-thrall.png');
		game.load.image('spam1', 'img/creeps/t1-shoal.png');
		game.load.image('thrower1', 'img/creeps/t1-thrower.png');
		
		game.load.image('altar2', 'img/creeps/t2-altar.png');
		game.load.spritesheet('player2', 'img/creeps/t2-monarch-a.png', 92, 64);
		game.load.image('warrior2', 'img/creeps/t2-warrior.png');
		game.load.image('tank2', 'img/creeps/t2-tank.png');
		game.load.image('flying2', 'img/creeps/t2-harpy.png');
		game.load.image('harvester2', 'img/creeps/t2-thrall.png');
		game.load.image('spam2', 'img/creeps/t2-shoal.png');
		game.load.image('thrower2', 'img/creeps/t2-thrower.png');
		
		game.load.image('shadow-flying', 'img/shadows/harpy.png');
		game.load.image('shadow-player', 'img/shadows/monarch.png');
		game.load.image('shadow-spam', 'img/shadows/shoal.png');
		game.load.image('shadow-tank', 'img/shadows/tank.png');
		game.load.image('shadow-harvester', 'img/shadows/thrall.png');
		game.load.image('shadow-thrower', 'img/shadows/thrower.png');
		game.load.image('shadow-warrior', 'img/shadows/warrior.png');
		
		game.load.image('blood', 'img/blood.png');
		game.load.image('shot', 'img/shot.png');
		game.load.image('selector1', 'img/t1-selector.png');
		game.load.image('selector2', 'img/t2-selector.png');
		
		game.load.spritesheet('sheeple-walk', 'img/sheeple-w.png', 32, 32, 2);
		game.load.image('shadow-sheeple', 'img/shadows/sheeple.png');
	}
}

export = ImageLoader;
class ImageLoader {
	static load(game: Phaser.Game) {
		game.load.image('bg', 'img/bg2.jpg');
		game.load.image('sheeple', 'img/sheeple.png');
		game.load.image('soul', 'img/soul.png');
		

		game.load.spritesheet('altar1', 'img/creeps/t1-altar-a.png', 64, 96);
		game.load.spritesheet('player1', 'img/creeps/t1-monarch-a.png', 92, 64);
		game.load.image('warrior1', 'img/creeps/t1-warrior.png');
		game.load.image('tank1', 'img/creeps/t1-tank.png');
		game.load.image('flying1', 'img/creeps/t1-harpy.png');
		game.load.image('harvester1', 'img/creeps/t1-thrall.png');
		game.load.image('spam1', 'img/creeps/t1-shoal.png');
		game.load.image('thrower1', 'img/creeps/t1-thrower.png');
		
		game.load.spritesheet('altar2', 'img/creeps/t2-altar-a.png', 64, 96);
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
		
		game.load.spritesheet('sheeple-new', 'img/sheeple-new.png', 32, 48, 12);
		game.load.image('shadow-sheeple', 'img/shadows/sheeple.png');
		
		game.load.image('splash', 'img/splash.jpg');
		game.load.image('controls', 'img/controls.jpg');
		game.load.image('win1', 'img/win1.png');
		game.load.image('win2', 'img/win2.png');
		
		
		game.load.image('healthmanabg1', 'img/healthmanabg1.png');
		game.load.image('healthmanabg2', 'img/healthmanabg2.png');
		game.load.image('healthbar', 'img/healthbar.png');
		game.load.image('manabar', 'img/manabar.png');
		
		game.load.audio('music', 'audio/NextofKinNotifiedWIP4.mp3');
		game.load.audio('scream0', 'audio/scream/9432__thanvannispen__male-thijs-loud-scream.wav');
		game.load.audio('scream1', 'audio/scream/42847__freqman__psycho-scream-1.wav');
		game.load.audio('scream2', 'audio/scream/50776__smcameron__fall-with-impact.ogg');
		game.load.audio('scream3', 'audio/scream/58793__syna-max__death-scream.wav');
		game.load.audio('scream4', 'audio/scream/235591__tcrocker68__girl-scream-followingscreams.wav');
		game.load.audio('demon0', 'audio/demon/213509__soykevin__zombie-attack.wav');
		game.load.audio('demon1', 'audio/demon/85568__joelaudio__dragon-roar.wav');
		game.load.audio('demon2', 'audio/demon/48688__sea-fury__monster-4.wav');
		game.load.audio('demon3', 'audio/demon/49127__aesqe__monster-growl-01.wav');
		game.load.audio('demon4', 'audio/demon/50881__gabemiller74__werewolf.wav');
		game.load.audio('attack0', 'audio/attack/44203__zolopher__splat_0.wav');
		game.load.audio('attack1', 'audio/attack/54807__mwl500__good-kick-in-the-head-sound.wav');
		game.load.audio('attack2', 'audio/attack/89769__cgeffex__fist-punch-3.wav');
		game.load.audio('attack3', 'audio/attack/118513__thefsoundman__punch-02.wav');
		
	}
}

export = ImageLoader;
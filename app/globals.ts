import BloodSplatterCollection = require('./bloodSplatterCollection');
import GameObject = require('./gameObject');
import Lamb = require('./lamb');
import LiteEvent = require('./liteEvent');
import Materials = require('./materials');
import Shot = require('./shot');
import Soul = require('./soul');
import SoulCollection = require('./soulCollection');
import Soundscape = require('./soundscape');

class Globals {

	static game: Phaser.Game;
	static lambCollisionGroup: Phaser.Physics.P2.CollisionGroup;
	static playerCollisionGroup: Phaser.Physics.P2.CollisionGroup;
	static pitCollisionGroup: Phaser.Physics.P2.CollisionGroup;
	static groundCreatureCollisionGroup: Phaser.Physics.P2.CollisionGroup;
	static flyingCreatureCollisionGroup: Phaser.Physics.P2.CollisionGroup;
	static flyingSensorCollisionGroup: Phaser.Physics.P2.CollisionGroup;


	static layerUi: Phaser.Group;
	static layerFlying: Phaser.Group;
	static layerGround: Phaser.Group;

	static lambSacrificed: LiteEvent<Lamb>;

	static gameObjects: Array<GameObject> = [];
	static shots: Array<Shot> = [];

	static bloodSplatters: BloodSplatterCollection;
	static souls: SoulCollection;
	
	static soundscape: Soundscape;

	static oneTimeInit(game: Phaser.Game) {
		this.game = game;

		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.setImpactEvents(true);
		this.game.physics.p2.restitution = 0.8;

		this.lambCollisionGroup = game.physics.p2.createCollisionGroup();
		this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
		this.pitCollisionGroup = game.physics.p2.createCollisionGroup();
		this.groundCreatureCollisionGroup = game.physics.p2.createCollisionGroup();
		this.flyingCreatureCollisionGroup = game.physics.p2.createCollisionGroup();
		this.flyingSensorCollisionGroup = game.physics.p2.createCollisionGroup();

		this.game.physics.p2.updateBoundsCollisionGroup();
		
		Materials.init(this.game);
		
		this.soundscape = new Soundscape(this.game);
	}
	
	static init() {
		this.lambSacrificed = new LiteEvent<Lamb>();
		this.gameObjects.length = 0;
		this.shots.length = 0;

		this.layerGround = this.game.add.group();
		this.layerFlying = this.game.add.group();
		this.layerUi = this.game.add.group();

		this.bloodSplatters = new BloodSplatterCollection(this.game);
		this.souls = new SoulCollection(this.game);
	}
	
	static tidyUpMaybe() {
		for (var i= 0; i < this.gameObjects.length; i++) {
			this.gameObjects[i].sprite.destroy();
			let hack = (<any>this.gameObjects[i]).circleBody;
			if (hack) {
				hack.removeFromWorld();
			}
		}

		this.layerGround.destroy();
		this.layerFlying.destroy();
	}
	
	static removeStuff() {
		this.layerGround.destroy();
		this.layerFlying.destroy();
		this.layerUi.destroy();
		
		this.bloodSplatters.reset();
	}

	static addBloodSplatter(x: number, y: number, duration: number, numParticles: number) {
		this.bloodSplatters.add(x, y, duration, numParticles);
	}

	static addSoul(x: number, y: number, playerNumber: number) {
		this.souls.add(x, y, playerNumber);
	}
}

export = Globals;
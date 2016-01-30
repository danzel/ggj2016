import BloodSplatterCollection = require('./bloodSplatterCollection');
import GameObject = require('./gameObject');
import Lamb = require('./lamb');
import LiteEvent = require('./liteEvent');
import Shot = require('./shot');
import Soul = require('./soul');
import SoulCollection = require('./soulCollection');

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
	
	static lambSacrificed: LiteEvent<Lamb> = new LiteEvent<Lamb>();  
	
	static gameObjects: Array<GameObject> = [];
	static bloodSplatters: BloodSplatterCollection;
	static shots: Array<Shot> = [];
	static souls: SoulCollection;
	
	static init(game: Phaser.Game) {
		this.game = game;
		this.lambCollisionGroup = game.physics.p2.createCollisionGroup();
		this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
		this.pitCollisionGroup = game.physics.p2.createCollisionGroup();
		this.groundCreatureCollisionGroup = game.physics.p2.createCollisionGroup();
		this.flyingCreatureCollisionGroup = game.physics.p2.createCollisionGroup();
		this.flyingSensorCollisionGroup = game.physics.p2.createCollisionGroup();
		
		this.layerGround = game.add.group();
		this.layerFlying = game.add.group();
		this.layerUi = game.add.group();

		this.bloodSplatters = new BloodSplatterCollection(game);
		this.souls = new SoulCollection(game);
		
		game.physics.p2.updateBoundsCollisionGroup();
	}
	
	static addBloodSplatter(x: number, y: number, duration: number, numParticles: number) {
		this.bloodSplatters.add(x, y, duration, numParticles);
	}
	
	static addSoul(x: number, y: number, playerNumber: number) {
		this.souls.add(x, y, playerNumber);
	}
}

export = Globals;
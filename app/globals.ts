import BloodSplatterCollection = require('./bloodSplatterCollection');
import GameObject = require('./gameObject');
import Lamb = require('./lamb');
import LiteEvent = require('./liteEvent');

class Globals {
	
	static game: Phaser.Game;
	static lambCollisionGroup: Phaser.Physics.P2.CollisionGroup;
	static playerCollisionGroup: Phaser.Physics.P2.CollisionGroup;
	static pitCollisionGroup: Phaser.Physics.P2.CollisionGroup;
	static groundCreatureCollisionGroup: Phaser.Physics.P2.CollisionGroup;
	static flyingCreatureCollisionGroup: Phaser.Physics.P2.CollisionGroup;
	static flyingSensorCollisionGroup: Phaser.Physics.P2.CollisionGroup;
	
	
	static lambSacrificed: LiteEvent<Lamb> = new LiteEvent<Lamb>();  
	
	static gameObjects: Array<GameObject> = [];
	static bloodSplatters: BloodSplatterCollection;
	
	static init(game: Phaser.Game) {
		this.game = game;
		this.lambCollisionGroup = game.physics.p2.createCollisionGroup();
		this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
		this.pitCollisionGroup = game.physics.p2.createCollisionGroup();
		this.groundCreatureCollisionGroup = game.physics.p2.createCollisionGroup();
		this.flyingCreatureCollisionGroup = game.physics.p2.createCollisionGroup();
		this.flyingSensorCollisionGroup = game.physics.p2.createCollisionGroup();
		
		this.bloodSplatters = new BloodSplatterCollection(game);
		
		game.physics.p2.updateBoundsCollisionGroup();
	}
	
	static addBloodSplatter(x: number, y: number) {
		this.bloodSplatters.add(x, y);
	}
}

export = Globals;
import GameObject = require('./gameObject');
import Lamb = require('./lamb');
import LiteEvent = require('./liteEvent');

class Globals {
	static lambCollisionGroup: Phaser.Physics.P2.CollisionGroup;
	static playerCollisionGroup: Phaser.Physics.P2.CollisionGroup;
	static pitCollisionGroup: Phaser.Physics.P2.CollisionGroup;
	
	static lambSacrificed: LiteEvent<Lamb> = new LiteEvent<Lamb>();  
	
	static gameObjects: Array<GameObject> = [];
	
	static init(game: Phaser.Game) {
		this.lambCollisionGroup = game.physics.p2.createCollisionGroup();
		this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
		this.pitCollisionGroup = game.physics.p2.createCollisionGroup();
		game.physics.p2.updateBoundsCollisionGroup();
	}
}

export = Globals;
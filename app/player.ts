import Globals = require('./globals');
import Lamb = require('./lamb');

class Player {
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;

	mana: number = 50;
	health: number = 100;

	followers: Array<Lamb> = [];
	springs: Array<Phaser.Physics.P2.Spring> = [];
	maxFollowers: number = 1;
	
	constructor(private game: Phaser.Game, public id: number, private gamepad: Phaser.SinglePad) {
		Globals.lambSacrificed.on((lamb) => this.lambSacrificed(lamb));
		
		if (id == 1) {
			this.sprite = game.add.sprite(100, 300);
		} else {
			this.sprite = game.add.sprite(1280 - 100, 300);
		}
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;

		game.physics.p2.enable(this.sprite, true);
		this.body = <Phaser.Physics.P2.Body>this.sprite.body;

		this.body.setCircle(30);
		this.body.setZeroDamping();
		this.body.fixedRotation = true;

		this.body.setCollisionGroup(Globals.playerCollisionGroup);
		
		//Be careful to put callback ones first (or don't put callback ones in the second array)
		this.body.collides(Globals.lambCollisionGroup, this.lambCollision, this);
		this.body.collides(Globals.pitCollisionGroup, this.pitCollision, this);
		
		this.body.collides([Globals.playerCollisionGroup]);
	}

	lambCollision(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body) {
		let lamb = <Lamb>(<any>body2.sprite).lamb;
		if (this.followers.length < this.maxFollowers && this.followers.indexOf(lamb) == -1) {
			this.followers.push(lamb);
			
			this.springs.push(this.game.physics.p2.createSpring(body1, body2, 50, 50, 0.2));
		}
	}

	pitCollision(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body) {
		
		while (this.followers.length > 0) {
			var lamb = this.followers.pop();
			
			this.game.physics.p2.removeSpring(this.springs.pop());
			
			//TODO: move the lamb in to the pit instead
			lamb.sprite.destroy(); //TODO: remove from lambs list too
			
			this.mana += 10; //TODO: different lambs give different amounts
			
			
			Globals.lambSacrificed.trigger(lamb);
		}
	}
	
	lambSacrificed(lamb: Lamb) {
		let index = this.followers.indexOf(lamb);
		if (index != -1) {
			this.followers.splice(index, 1);
			this.game.physics.p2.removeSpring(this.springs[index]);
			this.springs.splice(index, 1);
		}
	}

	update() {
		//TODO: this means the player always has really good control, if we want them to be pushed around this won't work.
		this.body.setZeroVelocity();
		this.body.moveRight(this.gamepad.axis(0) * 400);
		this.body.moveDown(this.gamepad.axis(1) * 400);
		
		//TODO: other controls...

		//this.sprite.body.force.x = this.gamepad.axis(0) * 100;
		//this.sprite.body.force.y = this.gamepad.axis(1) * 100;
	}

}

export = Player;
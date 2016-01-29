import GameObject = require('./gameObject');
import Globals = require('./globals');
import Lamb = require('./lamb');
import Player = require('./player');

class Harvester implements GameObject {
	sprite: Phaser.Sprite;
	body: Phaser.Physics.P2.Body;

	target: Lamb;
	isDraggingTarget: boolean;
	targetSpring: Phaser.Physics.P2.Spring;

	constructor(private game: Phaser.Game, private player: Player, x: number, y: number) {
		Globals.lambSacrificed.on((lamb) => this.lambSacrificed(lamb));

		this.sprite = game.add.sprite(x, y);
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;

		game.physics.p2.enable(this.sprite, true);
		this.body = <Phaser.Physics.P2.Body>this.sprite.body;
		(<any>this.body).harvester = this;
		this.body.setCircle(20);
		this.body.setZeroDamping();
		this.body.fixedRotation = true;


		this.body.setCollisionGroup(Globals.groundCreatureCollisionGroup);
		
		//Be careful to put callback ones first (or don't put callback ones in the second array)
		this.body.collides(Globals.lambCollisionGroup, this.lambCollision, this);

		this.body.collides([Globals.playerCollisionGroup, Globals.pitCollisionGroup, Globals.groundCreatureCollisionGroup]);
	}

	lambCollision(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body) {
		let lamb = <Lamb>(<any>body2).lamb; 
		if (!this.isDraggingTarget && !lamb.beingDragged) {
			this.target = lamb;
			this.targetSpring = this.game.physics.p2.createSpring(body1, body2, 45, 100, 0.7);
			this.isDraggingTarget = true;
			lamb.beingDragged = true;
		}
	}

	lambSacrificed(lamb: Lamb) {
		if (this.target == lamb) {
			this.game.physics.p2.removeSpring(this.targetSpring);
			this.target = null;
			this.targetSpring = null;
			this.isDraggingTarget = false;
		}
	}

	update() {
		if (!this.target || !this.target.sprite.alive || (!this.isDraggingTarget && this.target.beingDragged)) {
			this.findNewTarget();
		}

		if (!this.target) {
			return;
		}

		let moveTarget: GameObject;
		if (this.isDraggingTarget) {
			moveTarget = this.player.sacrificePit;
		} else {
			moveTarget = this.target;
		}

		let xDiff = moveTarget.body.x - this.body.x;
		let yDiff = moveTarget.body.y - this.body.y;

		let dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

		xDiff /= dist;
		yDiff /= dist;

		let force = 30;
		this.body.applyForce([-xDiff * force, -yDiff * force], 0, 0);
	}

	private findNewTarget() {

		this.target = null;
		let minDistance = 99999999999999;

		for (let i = 0; i < Globals.gameObjects.length; i++) {
			let l = Globals.gameObjects[i];
			if (!(l instanceof Lamb) && !(<Lamb>l).beingDragged) {
				continue;
			}

			let dist = (this.body.x - l.body.x) * (this.body.x - l.body.x) + (this.body.y - l.body.y) * (this.body.y - l.body.y);

			if (dist < minDistance) {
				minDistance = dist;
				this.target = <Lamb>l;
			}
		}
	}
}

export = Harvester;

import CombatUnit = require('./combatUnit');
import GameObject = require('./gameObject');
import Globals = require('./globals');
import Lamb = require('./lamb');
import Player = require('./player');

class Harvester extends CombatUnit {
	target: Lamb;
	isDraggingTarget: boolean;
	targetSpring: Phaser.Physics.P2.Spring;

	constructor(private game: Phaser.Game, player: Player, x: number, y: number) {
		super(game, player, 20, player.id);
		Globals.lambSacrificed.on((lamb) => this.lambSacrificed(lamb));

		this.sprite = game.add.sprite(x, y, 'harvester' + player.id);
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;

		game.physics.p2.enable(this.sprite);
		this.body = <Phaser.Physics.P2.Body>this.sprite.body;
		(<any>this.body).harvester = this;
		(<any>this.body).combatUnit = this;
		this.body.setCircle(20);
		this.body.damping = 0.7;
		this.body.fixedRotation = true;


		this.body.setCollisionGroup(Globals.groundCreatureCollisionGroup);
		
		//Be careful to put callback ones first (or don't put callback ones in the second array)
		this.body.collides(Globals.lambCollisionGroup, this.lambCollision, this);

		this.body.collides([Globals.playerCollisionGroup, Globals.pitCollisionGroup, Globals.groundCreatureCollisionGroup, Globals.flyingSensorCollisionGroup]);
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
			lamb.beingDragged = false;
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

		if (this.target) {

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
			this.rotateSprite(-xDiff, -yDiff);
		}
		
		super.update();
	}

	private findNewTarget() {

		this.target = null;
		let minDistance = 99999999999999;

		for (let i = 0; i < Globals.gameObjects.length; i++) {
			let l = Globals.gameObjects[i];
			if (!(l instanceof Lamb) || (<Lamb>l).beingDragged) {
				continue;
			}

			let dist = (this.body.x - l.body.x) * (this.body.x - l.body.x) + (this.body.y - l.body.y) * (this.body.y - l.body.y);

			if (dist < minDistance) {
				minDistance = dist;
				this.target = <Lamb>l;
			}
		}
	}
	
	onDead() {
		debugger;
		this.lambSacrificed(this.target);
	}
}

export = Harvester;

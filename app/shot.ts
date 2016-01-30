import CombatUnit = require('./combatUnit');
import Globals = require('./globals');
import SummonedUnit = require('./summonedUnit');

class Shot {
	sprite: Phaser.Sprite;
	
	constructor(private game: Phaser.Game, shooter: SummonedUnit, private target: CombatUnit, private speed: number, private damage: number) {
		this.sprite = this.game.add.sprite(shooter.sprite.x, shooter.sprite.y, 'shot');

	}
	
	update() {
		let x = this.target.sprite.x - this.sprite.x;
		let y = this.target.sprite.y - this.sprite.y;
		
		let dist = Math.sqrt(x * x + y * y);
		
		if (dist < 10) {
			this.finish();
			return;
		} else {
			x /= dist;
			y /= dist;
			
			this.sprite.x += x * this.game.time.physicsElapsed * this.speed;
			this.sprite.y += y * this.game.time.physicsElapsed * this.speed;
		}
		
		var angle = Math.atan2(y, x) * 180 / Math.PI;
		this.sprite.angle = angle;
	}
	
	finish() {
		
		let totalSpam = 20;
		let spam = totalSpam;
		while (spam > 0) {
			this.target.takeDamage(this.damage / totalSpam);
			spam--;
		}
		Globals.shots.splice(Globals.shots.indexOf(this), 1);
		this.sprite.destroy();
	}
}

export = Shot;
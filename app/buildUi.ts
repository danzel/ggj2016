import ControlMode = require('./controlMode');
import Player = require('./player');

class BuildUi {
	game: Phaser.Game;
	group: Phaser.Group;
	itemSprites: Array<Phaser.Sprite> = [];
	selectorSprite: Phaser.Sprite;
	visible: boolean = false;
	
	constructor(game: Phaser.Game, private player: Player) {
		this.game = game;
		this.group = game.add.group(null);
		var spriteNames = [ 'harvester', 'spam', 'warrior', 'tank', 'flying', 'thrower' ];
		this.selectorSprite = game.add.sprite(0, 0, 'selector' + player.id, undefined, this.group);
		this.selectorSprite.anchor.x = 0.5;
		this.selectorSprite.anchor.y = 0.35;
		this.selectorSprite.alpha = 0.95;
		for (var i = 0; i < spriteNames.length; i++) {
			var v = this.getPosition(i);
			var sprite = game.add.sprite(v.x, v.y, spriteNames[i] + player.id, undefined, this.group);
			sprite.anchor.x = 0.5;
			sprite.anchor.y = 0.5;
			sprite.alpha = 0.65;
			this.itemSprites.push(sprite);
		}
	}
	
	update() {
		var visible = this.player.controlMode == ControlMode.BUILD;
		if (visible) {
			this.group.x = this.player.sprite.x;
			this.group.y = this.player.sprite.y;
			var v = this.getPosition(this.player.selectedItem);
			this.selectorSprite.x = v.x;
			this.selectorSprite.y = v.y;
		}
		if (visible == this.visible)
			return;
		this.visible = visible;
		if (visible)
			this.game.world.add(this.group);
		else
			this.game.world.remove(this.group);
	}
	
	private getPosition(i: number) {
		var angle = i / 6 * (Math.PI*2) - Math.PI/2;
		var x = Math.cos(angle) * 110;
		var y = Math.sin(angle) * 110;
		return { x: x, y: y };		
	}
}

export = BuildUi;
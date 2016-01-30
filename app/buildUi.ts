import Player = require('./player');

class BuildUi {
	game: Phaser.Game;
	group: Phaser.Group;
	itemSprites: Array<Phaser.Sprite> = [];
	selectorSprite: Phaser.Sprite;
	visible: boolean = false;

	text: Phaser.Text;

	constructor(game: Phaser.Game, private player: Player) {
		this.game = game;
		this.group = game.add.group(null);
		var spriteNames = ['harvester', 'spam', 'warrior', 'tank', 'flying', 'thrower'];
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
			sprite.scale.set(0.5);
			this.itemSprites.push(sprite);
		}

		this.text = new Phaser.Text(game, -100, -110, "Shooter", {
			boundsAlignH: 'center',
			stroke: '#ffffff',
			strokeThickness: 4
		});
		this.text.setTextBounds(0, 0, 200, 50);
		this.group.add(this.text);
		
		/*if (this.player.id == 1) {
			this.group.x = 130;
			this.group.y = 720 - 130;
		} else {
			this.group.x = 1280 - 130;
			this.group.y = 720 - 130;
		}*/
	}

	update() {
		var visible = this.player.timeBuildVisible < 1;
		if (visible) {
			this.group.x = this.player.sprite.x;
			this.group.y = this.player.sprite.y;
			var v = this.getPosition(this.player.selectedItem);
			this.selectorSprite.x = v.x;
			this.selectorSprite.y = v.y;

			this.text.setText(this.getText(this.player.selectedItem));
		}
		if (visible == this.visible)
			return;
		this.visible = visible;
		if (visible)
			this.game.world.add(this.group);
		else
			this.game.world.remove(this.group);
	}

	private getText(i: number) {
		switch (i) {
			case 0:
				return "Harvester";
			case 1:
				return "Shoal";
			case 2:
				return "Warrior";
			case 3:
				return "Tank";
			case 4:
				return "Flyer";
			case 5:
				return "Thrower";
		}
	}

	private getPosition(i: number) {
		var angle = i / 6 * (Math.PI * 2) - Math.PI / 2;
		var x = Math.cos(angle) * 60;
		var y = Math.sin(angle) * 60;
		return { x: x, y: y };
	}
}

export = BuildUi;
class Soundscape {
	screamEnabled: boolean = true;
	attackEnabled: boolean = true;
	
	constructor(private game: Phaser.Game) {
		game.time.events.add(Math.random() * 500 + 500, this.demonSound, this);		
	}
	
	addScream() {
		if (!this.screamEnabled)
			return;
		var scream = this.game.add.audio('scream' + Math.floor(Math.random() * 5));
		scream.play();
		this.screamEnabled = false;		
		this.game.time.events.add(Math.random() * 4500 + 400, this.resetScreamSound, this);		
	}
	
	private resetScreamSound() {
		this.screamEnabled = true;
	}
	
	addAttack() {
		if (!this.attackEnabled)
			return;
		var attack = this.game.add.audio('attack' + Math.floor(Math.random() * 4), 0.3);
		attack.play();
		this.attackEnabled = false;		
		this.game.time.events.add(Math.random() * 700 + 100, this.resetAttackSound, this);		
	}
	
	private resetAttackSound() {
		this.attackEnabled = true;
	}
	
	private demonSound() {
		this.game.time.events.add(Math.random() * 5000 + 200, this.demonSound, this);
		var demon = this.game.add.audio('demon' + Math.floor(Math.random() * 5));
		demon.play();		
	}
}

export = Soundscape;
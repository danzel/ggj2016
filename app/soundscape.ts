class Soundscape {
	screamEnabled: boolean = true;
	
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
	
	private demonSound() {
		this.game.time.events.add(Math.random() * 5000 + 200, this.demonSound, this);
		var demon = this.game.add.audio('demon' + Math.floor(Math.random() * 5));
		demon.play();		
	}
}

export = Soundscape;
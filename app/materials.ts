class Materials {
	static groundUnitMaterial: Phaser.Physics.P2.Material;
	
	static init(game: Phaser.Game) {
		Materials.groundUnitMaterial = game.physics.p2.createMaterial('groundUnitMaterial');
		
		//http://phaser.io/examples/v2/p2-physics/contact-material
		game.physics.p2.createContactMaterial(Materials.groundUnitMaterial, Materials.groundUnitMaterial, {
			friction: 1,
			restitution: 0,
			stiffness: 1e7,
			relaxation: 4,
			frictionStiffness: 1e7,
			frictionRelaxation: 5,
			surfaceVelocity: 0
		});
	}
}

export = Materials;
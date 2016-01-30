interface SummonedUnitDef {
	size: number;
	health: number;
	movementForce: number;
	collisionGroup: Phaser.Physics.P2.CollisionGroup;
	collidesWith: Array<Phaser.Physics.P2.CollisionGroup>;
	
	dps: number;
	
	sprite: string;
	
	layer: Phaser.Group;
	
	//If set we are a capsule
	capsuleLength?: number;
	
	massMultiplier: number; 
}

export = SummonedUnitDef;
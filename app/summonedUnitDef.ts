interface ShadowDef {
	x: number,
	y: number,
	sprite: string
}

interface SummonedUnitDef {
	//If set we are a capsule
	capsuleLength?: number;
	size: number;
	
	health: number;
	dps: number;
	desiredTargetDistance: number;
	
	movementForce: number;
	massMultiplier: number; 

	layer: Phaser.Group;
	collisionGroup: Phaser.Physics.P2.CollisionGroup;
	collidesWith: Array<Phaser.Physics.P2.CollisionGroup>;
	
	sprite: string;
	
	shadow?: ShadowDef;
}

export = SummonedUnitDef;
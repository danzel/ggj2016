interface SummonedUnitDef {
	size: number;
	health: number;
	movementForce: number;
	collisionGroup: Phaser.Physics.P2.CollisionGroup;
	collidesWith: Array<Phaser.Physics.P2.CollisionGroup>;
	
	sprite: string;
}

export = SummonedUnitDef;
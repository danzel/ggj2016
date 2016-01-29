import GameObject = require('./gameObject');

interface CombatUnit extends GameObject {
	health: number;
	maxHealth: number;
}

export = CombatUnit;
import { type ClassAbility } from './class-ability';

export const HEALER_CLASS_ID = 1;

/** Mesmas regras do Mago: dano base = nível+arma; conjuração d20 ≥ 10; 2º d20 para bônus em Cura Aliado / Cura Todos. */
export const HEALER_ABILITIES: ClassAbility[] = [
    { id: 'basic', name: 'Ataque Básico', guaranteedHit: true, formula: 'base' },
    { id: 'heal_ally', name: 'Cura Aliado', guaranteedHit: false, formula: 'base_plus_half' },
    { id: 'heal_all', name: 'Cura Todos', guaranteedHit: false, formula: 'base_plus_quarter' },
    { id: 'deny_armor', name: 'Negar armadura', guaranteedHit: false, formula: 'none' },
    { id: 'blind', name: 'Cegar', guaranteedHit: false, formula: 'none' },
    { id: 'deceive', name: 'Enganar', guaranteedHit: false, formula: 'none' },
];

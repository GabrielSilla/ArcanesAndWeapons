import { type ClassAbility } from './class-ability';

export const WARRIOR_CLASS_ID = 2;

/** Mesmas regras de acerto das outras classes: d20 ≥ 10 para ações com teste; 2º d20 para bônus de dano ou redução. */
export const WARRIOR_ABILITIES: ClassAbility[] = [
    { id: 'basic', name: 'Ataque Básico', guaranteedHit: true, formula: 'base' },
    { id: 'heavy', name: 'Ataque Pesado', guaranteedHit: false, formula: 'base_plus_half' },
    { id: 'area', name: 'Ataque em Área', guaranteedHit: false, formula: 'base_plus_quarter' },
    { id: 'defend', name: 'Defender', guaranteedHit: false, formula: 'reduce_half' },
    { id: 'taunt', name: 'Provocar', guaranteedHit: false, formula: 'none' },
];

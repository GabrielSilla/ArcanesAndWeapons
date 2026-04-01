import { type ClassAbility } from './class-ability';

export const CRUSADER_CLASS_ID = 6;

/** Placeholder — adicionar habilidades quando as regras estiverem definidas. */
export const CRUSADER_ABILITIES: ClassAbility[] = [
    { id: 'basic', name: 'Ataque Básico', guaranteedHit: true, formula: 'base' },
    { id: 'smashing_hammer', name: 'Martelo Esmagador', guaranteedHit: false, formula: 'base_plus_half' },
    { id: 'divine_wrath', name: 'Fúria Divina', guaranteedHit: false, formula: 'none' },
    { id: 'smash_armor', name: 'Arremessar Martelo', guaranteedHit: false, formula: 'base_plus_quarter' },
    { id: 'divine_protection', name: 'Proteção Divina', guaranteedHit: false, formula: 'none' },
];

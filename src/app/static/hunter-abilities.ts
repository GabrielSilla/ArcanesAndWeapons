import { type ClassAbility } from './class-ability';

export const HUNTER_CLASS_ID = 5;

/** Placeholder — adicionar habilidades quando as regras estiverem definidas. */
export const HUNTER_ABILITIES: ClassAbility[] = [
    { id: 'basic', name: 'Ataque Básico', guaranteedHit: true, formula: 'base' },
    { id: 'piercing', name: 'Flecha Perfurante', guaranteedHit: false, formula: 'base_plus_half' },
    { id: 'arrow_rain', name: 'Chuva de Flechas', guaranteedHit: false, formula: 'base_plus_quarter' },
    { id: 'buff_pet', name: 'Incentivar Companheiro', guaranteedHit: false, formula: 'none' },
    { id: 'poison_arrow', name: 'Envenenadar Flecha', guaranteedHit: false, formula: 'none' }
];

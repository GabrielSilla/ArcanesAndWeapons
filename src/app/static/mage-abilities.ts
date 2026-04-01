import { type ClassAbility } from './class-ability';

export const MAGE_CLASS_ID = 4;

export const MAGE_ABILITIES: ClassAbility[] = [
    { id: 'basic', name: 'Ataques básicos', guaranteedHit: true, formula: 'base' },
    { id: 'fireball', name: 'Bola de fogo', guaranteedHit: false, formula: 'base_plus_half' },
    { id: 'thunder', name: 'Trovão em área', guaranteedHit: false, formula: 'base_plus_quarter' },
    { id: 'freeze', name: 'Congelar', guaranteedHit: false, formula: 'none' },
    { id: 'gust', name: 'Ventania', guaranteedHit: false, formula: 'none' },
];

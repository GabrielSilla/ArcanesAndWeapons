import { type ClassAbility } from './class-ability';

export const ROGUE_CLASS_ID = 3;

/** Mesmas regras de acerto (d20 ≥ 10) e 2º d20 para bônus onde aplicável. */
export const ROGUE_ABILITIES: ClassAbility[] = [
    { id: 'basic', name: 'Ataque Básico', guaranteedHit: true, formula: 'base' },
    {
        id: 'piercing',
        name: 'Ataque Perfurante',
        guaranteedHit: false,
        formula: 'base_plus_quarter',
    },
    {
        id: 'poison_dagger',
        name: 'Envenenar Adaga',
        guaranteedHit: false,
        formula: 'none',
        noneEffect: 'próximo ataque causa envenenamento',
    },
    {
        id: 'steal',
        name: 'Roubar',
        guaranteedHit: false,
        formula: 'none',
        noneEffect: 'rouba itens',
    },
    {
        id: 'undetectable',
        name: 'Indetectável',
        guaranteedHit: false,
        formula: 'none',
        noneEffect: 'fica invisível (indetectável)',
    },
];

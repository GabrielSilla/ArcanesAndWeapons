export const CAST_HIT_DC = 10;

export type ClassDamageFormula =
    | 'base'
    | 'base_plus_half'
    | 'base_plus_quarter'
    | 'none'
    /** Redução de dano recebido: ⌈2º d20/2⌉ (após teste ≥ 10) */
    | 'reduce_half';

export interface ClassAbility {
    id: string;
    name: string;
    guaranteedHit: boolean;
    formula: ClassDamageFormula;
    /** Para formula `none`: descrição do efeito na mesa (prévia e mensagem de sucesso). */
    noneEffect?: string;
}

export function rollD20(): number {
    return Math.floor(Math.random() * 20) + 1;
}

export function bonusFromHalf(roll: number): number {
    return Math.ceil(roll / 2);
}

export function bonusFromQuarter(roll: number): number {
    return Math.floor(roll / 4);
}

export function castHitSuccess(hitRoll: number): boolean {
    return hitRoll >= CAST_HIT_DC;
}

import { CardModel } from './card-model';

const MAGICAL_CLASS_IDS = new Set([1, 4]);
const PHYSICAL_CLASS_IDS = new Set([2, 3, 5, 6]);

export function isMagicalClass(classId: number): boolean {
    return MAGICAL_CLASS_IDS.has(classId);
}

export function isPhysicalClass(classId: number): boolean {
    return PHYSICAL_CLASS_IDS.has(classId);
}

/** Consumíveis equipam sempre; armas só se o tipo combinar com a classe (física/mágica). */
export function canEquipWeapon(classId: number, item: CardModel): boolean {
    if (!item.isWeapon) {
        return true;
    }
    if (item.equipInType === 'magic') {
        return isMagicalClass(classId);
    }
    if (item.equipInType === 'melee') {
        return isPhysicalClass(classId);
    }
    return false;
}

export function weaponDamageBonus(classId: number, item: CardModel): number {
    return item.isWeapon && item.bonusInClass === classId ? 1 : 0;
}

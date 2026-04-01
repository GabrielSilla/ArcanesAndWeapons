/** Armas físicas (corpo a corpo e à distância) vs mágicas; `null` para não-armas. */
export type WeaponEquipType = 'melee' | 'magic';

export class CardModel {
    id: number;
    name: string;
    source: string;
    isWeapon: boolean;
    attack: number;
    /** `null` se não for arma (poções, pedras, etc.). */
    equipInType: WeaponEquipType | null;
    /** Id da classe que recebe +1 de dano com esta arma; `0` se não aplicável. */
    bonusInClass: number;
    isStone: boolean;

    /**
     * @param equipInType Tipo de arma (físico/mágico); ignorado quando `isStone === true` (pedra, não arma).
     * @param bonusInClass Classe com bónus +1 de dano; 0 quando não aplicável.
     * @param isStone Pedra mágica (não é arma).
     */
    constructor(
        id: number,
        name: string,
        source: string,
        isWeapon: boolean,
        attack: number,
        equipInType: WeaponEquipType | null = null,
        bonusInClass = 0,
        isStone = false,
    ) {
        this.id = id;
        this.name = name;
        this.source = source;
        this.isWeapon = isWeapon;
        this.attack = attack;
        this.equipInType = equipInType;
        this.bonusInClass = bonusInClass;
        this.isStone = isStone;
    }
}

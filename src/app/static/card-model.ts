export class CardModel {
    id: number;
    name: string;
    source: string;
    isWeapon: boolean;
    attack: number;
    equipInClass: number;
    isStone: boolean;

    constructor(id: number, name: string, source: string, isWeapon: boolean, attack: number, equipInClass: number = 0, isStone: boolean = false) {
        this.id = id;
        this.name = name;
        this.source = source;
        this.isWeapon = isWeapon;
        this.attack = attack;
        this.equipInClass = equipInClass;
        this.isStone = isStone;
    }
}
export class CardModel {
    id: number;
    name: string;
    source: string;
    isWeapon: boolean;
    attack: number;
    equipInClass: number

    constructor(id: number, name: string, source: string, isWeapon: boolean, attack: number, equipInClass: number = 0) {
        this.id = id;
        this.name = name;
        this.source = source;
        this.isWeapon = isWeapon;
        this.attack = attack;
        this.equipInClass = equipInClass;
    }
}
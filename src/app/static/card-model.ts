export class CardModel {
    id: number;
    name: string;
    source: string;
    isWeapon: boolean;
    attack: number;

    constructor(id: number, name: string, source: string, isWeapon: boolean, attack: number) {
        this.id = id;
        this.name = name;
        this.source = source;
        this.isWeapon = isWeapon;
        this.attack = attack;
    }
}
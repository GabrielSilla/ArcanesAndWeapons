export class MagicCardModel {
    id: number;
    name: string;
    source: string;
    arcaneCost: number;
    deathCost: number;
    elementalCost: number;
    holyCost: number;

    constructor(id: number, name: string, source: string, arcaneCost: number, deathCost: number, elementalCost: number, holyCost: number) {
        this.id = id;
        this.name = name;
        this.source = source;
        this.arcaneCost = arcaneCost;
        this.deathCost = deathCost;
        this.elementalCost = elementalCost;
        this.holyCost = holyCost;
    }
}
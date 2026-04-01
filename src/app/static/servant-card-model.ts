import { CardModel } from './card-model';

export type ServantKind = 'natural_magic' | 'tamed' | 'necromancy';

export type ServantCardOpts = {
    /** natural_magic: max HP pool */
    servantHp?: number;
    /** necromancy */
    turnDuration?: number;
    /** necromancy: extra damage on top of player base attack */
    damageBonus?: number;
};

export class ServantCardModel extends CardModel {
    readonly kind: ServantKind;
    readonly servantHp?: number;
    readonly turnDuration?: number;
    readonly damageBonus?: number;

    constructor(
        id: number,
        name: string,
        source: string,
        kind: ServantKind,
        opts: ServantCardOpts = {}
    ) {
        super(id, name, source, false, 0, null, 0, false);
        this.kind = kind;
        if (opts.servantHp !== undefined) {
            this.servantHp = opts.servantHp;
        }
        if (opts.turnDuration !== undefined) {
            this.turnDuration = opts.turnDuration;
        }
        if (opts.damageBonus !== undefined) {
            this.damageBonus = opts.damageBonus;
        }
    }
}

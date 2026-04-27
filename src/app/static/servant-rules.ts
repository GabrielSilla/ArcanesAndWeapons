import type { ServantCardModel } from './servant-card-model';

export type ServantDamageContext = {
    playerLevel: number;
    playerBaseDamage: number;
};

export function getServantDamage(servant: ServantCardModel, ctx: ServantDamageContext): number {
    switch (servant.kind) {
        case 'tamed':
            return Math.ceil(ctx.playerLevel / 2) + (servant.damageBonus ?? 0);
        case 'natural_magic':
            return ctx.playerBaseDamage;
        case 'necromancy':
            return ctx.playerBaseDamage + (servant.damageBonus ?? 0);
    }
}

export type ServantDurationMeta =
    | { mode: 'unlimited' }
    | { mode: 'hp_pool'; max: number }
    | { mode: 'turns'; max: number };

export function getServantDurationMeta(servant: ServantCardModel): ServantDurationMeta {
    switch (servant.kind) {
        case 'tamed':
            return { mode: 'unlimited' };
        case 'natural_magic':
            return { mode: 'hp_pool', max: servant.servantHp ?? 0 };
        case 'necromancy':
            return { mode: 'turns', max: servant.turnDuration ?? 0 };
    }
}

export function servantNeedsHpCounter(servant: ServantCardModel): boolean {
    return servant.kind === 'natural_magic';
}

export function servantNeedsTurnCounter(servant: ServantCardModel): boolean {
    return servant.kind === 'necromancy';
}

export function servantShowOnlyAttack(servant: ServantCardModel): boolean {
    return servant.kind === 'tamed';
}

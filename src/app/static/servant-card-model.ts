import { CardModel } from './card-model';

/** Espaço reservado para regras de mesa por servo (HP, ações, etc.). */
export type ServantRules = Record<string, unknown>;

/**
 * Carta de servo/lacaio: base igual às outras cartas + metadados para evolução.
 * Os dados em `cards.ts` podem continuar como `CardModel[]` até migrar entradas.
 */
export type ServantCardModel = CardModel & { rules?: ServantRules };

export function toServantCard(card: CardModel, rules?: ServantRules): ServantCardModel {
    return rules !== undefined ? Object.assign(card, { rules }) : (card as ServantCardModel);
}

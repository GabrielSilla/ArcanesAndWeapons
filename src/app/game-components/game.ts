import { Component, effect, inject, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActionConfig } from "./action-config/action-config";
import { Cards } from '../static/cards';
import { CardsScroll } from "./cards-scroll/cards-scroll";
import { CardModel } from '../static/card-model';
import type { ServantCardModel } from '../static/servant-card-model';
import {
    getServantDamage,
} from '../static/servant-rules';
import { ModalItensComponent } from './modal-itens/modal-itens';
import { ModalController } from '@ionic/angular';
import { Bag } from "./bag/bag";
import { MagicCardModel } from '../static/magic-card-model';
import { Messages } from './messages/messages';
import { ItemChange } from './item-change/item-change';
import { ClassActions } from './class-actions/class-actions';
import { ServantPicker } from './servant-picker/servant-picker';
import {
    GamePersistenceService,
    type SessionSnapshot,
} from '../services/game-persistence.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [IonicModule, CommonModule, ActionConfig, CardsScroll, Bag, Messages, ItemChange, ClassActions, ServantPicker],
  templateUrl: './game.html',
  styleUrl: './game.less'
})
export class Game {

    private readonly persistence = inject(GamePersistenceService);

    constructor(private modalCtrl: ModalController) {
        const snapshot = this.persistence.load();
        if (snapshot) {
            this.applySnapshot(snapshot);
        }
        effect(() => {
            this.persistence.saveDebounced(this.buildSnapshot());
        });
    }

    private buildSnapshot(): SessionSnapshot {
        return {
            schemaVersion: 1,
            totalhp: this.totalhp(),
            hp: this.hp(),
            level: this.level(),
            dice: this.dice(),
            diceRolled: this.diceRolled(),
            damage: this.damage(),
            hasClass: this.hasClass(),
            classId: this.classId(),
            classCard: this.classCard(),
            hasRace: this.hasRace(),
            raceId: this.raceId(),
            raceCard: this.raceCard(),
            hasWeapon: this.hasWeapon(),
            weaponCard: this.weaponCard(),
            hasSlave: this.hasSlave(),
            slaveCard: this.slaveCard(),
            slaveId: this.slaveId(),
            slaveCurrentHp: this.slaveCurrentHp(),
            slaveTurnsRemaining: this.slaveTurnsRemaining(),
            hasVD: this.hasVD(),
            vdCard: this.vdCard(),
            hasMagic: this.magicCards().length > 0,
            magicCards: this.magicCards(),
            tableCards: this.tableCards(),
            bagCards: this.bagCards(),
            bagStones: this.bagStones(),
        };
    }

    private applySnapshot(s: SessionSnapshot): void {
        this.totalhp.set(s.totalhp);
        this.hp.set(s.hp);
        this.level.set(s.level);
        this.dice.set(s.dice);
        this.diceRolled.set(false);
        this.damage.set(s.damage);
        this.selectedCard.set('');
        this.hasClass.set(s.hasClass);
        this.classId.set(s.classId);
        this.classCard.set(s.classCard);
        this.hasRace.set(s.hasRace);
        this.raceId.set(s.raceId);
        this.raceCard.set(s.raceCard);
        this.hasWeapon.set(s.hasWeapon);
        this.weaponCard.set(s.weaponCard);
        this.hasSlave.set(s.hasSlave);
        this.slaveCard.set(s.slaveCard);
        this.slaveId.set(s.slaveId ?? 0);
        this.applySlaveRuntime(s);
        this.hasVD.set(s.hasVD);
        this.vdCard.set(s.vdCard);
        this.magicCards.set(s.magicCards);
        this.hasMagic.set(s.magicCards.length > 0);
        this.tableCards.set(s.tableCards);
        this.bagCards.set(s.bagCards);
        this.bagStones.set(s.bagStones);
    }

    protected readonly title = signal('aa-game');

    buttons = [
      {
        text: '\uF2B9 Confirmar', // ícone + texto
        role: 'confirm',
        cssClass: 'icon-button'
      },
      {
        text: '\uF188 Cancelar', // outro ícone
        role: 'cancel',
        cssClass: 'icon-button'
      }
    ];

    resetConfirmButtons = [
        {
            text: 'Cancelar',
            role: 'cancel',
        },
        {
            text: 'Resetar',
            role: 'confirm',
            handler: () => {
                this.resetWithFlash();
            },
        },
    ];

    // State Control
    flashActive = signal(false);
    showBag = signal(false);
    showActionSheet = signal(false);
    showResetConfirm = signal(false);
    modalOpen = signal(false);
    alertMessage = signal("");
    messageModal = signal("");
    showChangeModal = signal(false);
    newItensConfirmed = signal(false);
    showServantPicker = signal(false);

    // Atributes
    totalhp = signal(25);
    hp = signal(25);
    level = signal(1);
    dice = signal(0);
    diceRolled = signal(false);
    damage = signal(this.level());
    
    // Cards Control
    cards = new Cards();

    selectedCard = signal("");

    hasClass = signal(false);
    classId = signal(0);
    classCard = signal("");

    hasRace = signal(false);
    raceId = signal(0);
    raceCard = signal("");

    hasWeapon = signal(false);
    weaponCard = signal("");

    hasSlave = signal(false);
    slaveCard = signal("");
    slaveId = signal(0);
    slaveCurrentHp = signal<number | null>(null);
    slaveTurnsRemaining = signal<number | null>(null);

    hasVD = signal(false);
    vdCard = signal("");

    hasMagic = signal(false);
    magicCards = signal<MagicCardModel[]>([]);

    vdCardsForCarousel = signal([]);
    magicCardsForCarousel = signal<MagicCardModel[]>([]);
    storeSpellCards = signal<MagicCardModel[]>([]);
    tableCards = signal<unknown[]>([]);

    bagCards = signal<CardModel[]>([]);
    bagStones = signal<CardModel[]>([]);
    chestReceivedItens = signal<CardModel[]>([]);

    public rollD20() {
        this.animateTo(20);
    }

    public rollD12() {
        this.animateTo(12);
    }

    public rollD4() {
        this.animateTo(4);
    }

    animateTo(target: number, duration = 600) {
        let counter = 0;
        
        const interval = setInterval(() => {
            this.dice.set(Math.floor(Math.random() * target) + 1);
            counter++;

            if (counter > 15) {
                clearInterval(interval);
                this.diceRolled.set(true);
            }
        }, 200);

        setTimeout(() => {
            this.dice.set(0);
            this.diceRolled.set(false);
        }, 6000);
    }

    lifePlus() {
        if(this.hp() < this.totalhp())
            this.hp.set(this.hp() + 1);
    }

    lifeMinus() {
        if(this.hp() > 0)
            this.hp.set(this.hp() - 1);
    }

    levelPlus() {
        if(this.level() < 10) {
            this.level.set(this.level() + 1);
            this.totalhp.set(this.totalhp() + 5);
            this.hp.set(this.hp() + 5);
            this.damage.set(this.damage() + 1);
        }
    }

    levelMinus() {
        if(this.level() > 1) {
            this.level.set(this.level() - 1);
            this.totalhp.set(this.totalhp() - 5);
            this.hp.set(this.hp() - 5);
            this.damage.set(this.damage() - 1);
        }
    }

    classCardView(path: string) {
        if(this.hasClass()) {
            this.selectedCard.set(path);
        }
    }
    
    raceCardView(path: string) {
        if(this.hasRace()) {
            this.selectedCard.set(path);
        }
    }

    vdCardView(path: string) {
        if(this.hasVD()) {
            this.selectedCard.set(path);
        }
    }

    magicCardView() {
        if(this.magicCards().length > 0) {
            this.magicCardsForCarousel.set(this.magicCards());
        }
    }

    closeMagicView() {
        this.magicCardsForCarousel.set([]);
    }

    chooseCardToBuy(cardId: any) {
        if(cardId) {
            let chosenSpell = this.cards.magic.filter(c => c.id == cardId)[0];
            
            let arcaneQtd = this.bagStones().filter(c => c.id == 1).length;
            let deathQtd = this.bagStones().filter(c => c.id == 2).length;
            let elementalQtd = this.bagStones().filter(c => c.id == 3).length;
            let holyQtd = this.bagStones().filter(c => c.id == 4).length;

            let insufficientStones = false;

            if(chosenSpell.arcaneCost > arcaneQtd) insufficientStones = true;
            if(chosenSpell.deathCost > deathQtd) insufficientStones = true;
            if(chosenSpell.elementalCost > elementalQtd) insufficientStones = true;
            if(chosenSpell.holyCost > holyQtd) insufficientStones = true;

            if(insufficientStones == true) {
                this.storeSpellCards.set([]);
                this.showMessage("Pedras insuficientes!");
                return;
            }
            
            this.removeStonesAfterBuy(1, chosenSpell.arcaneCost);
            this.removeStonesAfterBuy(2, chosenSpell.deathCost);
            this.removeStonesAfterBuy(3, chosenSpell.elementalCost);
            this.removeStonesAfterBuy(4, chosenSpell.holyCost);

            this.storeSpellCards.set([]);
            this.magicCards.update(cards => [...cards, chosenSpell]);
            this.hasMagic.set(this.magicCards().length > 0);
        } else {
            this.storeSpellCards.set([]);
        }
    }

    removeStonesAfterBuy(id: number, qtd: number) {
        for (let index = 0; index < qtd; index++) {
            this.bagStones.update(cards => {
                const index = cards.findIndex(c => c.id === id);

                if (index !== -1) {
                    cards.splice(index, 1);
                }

                return [...cards]; 
            });            
        }
    }

    weaponCardView(path: string) {
        if(this.hasWeapon()) {
            this.selectedCard.set(path);
        }
    }

    slaveCardView(path: string) {
        if (this.hasSlave()) {
            this.selectedCard.set(path);
        }
    }

    getSlaveCard(): ServantCardModel | null {
        if (!this.hasSlave() || !this.slaveId()) {
            return null;
        }
        return this.cards.servants.find((c) => c.id === this.slaveId()) ?? null;
    }

    getSlaveServantDamage(): number {
        const card = this.getSlaveCard();
        if (!card) {
            return 0;
        }
        return getServantDamage(card, {
            playerLevel: this.level(),
            playerBaseDamage: this.damage(),
        });
    }

    private initSlaveRuntime(card: ServantCardModel): void {
        if (card.kind === 'natural_magic' && card.servantHp != null) {
            this.slaveCurrentHp.set(card.servantHp);
            this.slaveTurnsRemaining.set(null);
        } else if (card.kind === 'necromancy' && card.turnDuration != null) {
            this.slaveTurnsRemaining.set(card.turnDuration);
            this.slaveCurrentHp.set(null);
        } else {
            this.slaveCurrentHp.set(null);
            this.slaveTurnsRemaining.set(null);
        }
    }

    clearSlave(): void {
        this.hasSlave.set(false);
        this.slaveCard.set('');
        this.slaveId.set(0);
        this.slaveCurrentHp.set(null);
        this.slaveTurnsRemaining.set(null);
    }

    private applySlaveRuntime(s: SessionSnapshot): void {
        if (!s.hasSlave) {
            this.slaveCurrentHp.set(null);
            this.slaveTurnsRemaining.set(null);
            return;
        }
        const sid = s.slaveId ?? 0;
        if (sid === 0) {
            this.clearSlave();
            return;
        }
        const card = this.cards.servants.find((c) => c.id === sid);
        if (!card) {
            this.slaveCurrentHp.set(null);
            this.slaveTurnsRemaining.set(null);
            return;
        }
        let hp = s.slaveCurrentHp ?? null;
        let turns = s.slaveTurnsRemaining ?? null;
        if (card.kind === 'natural_magic' && hp === null && card.servantHp != null) {
            hp = card.servantHp;
        }
        if (card.kind === 'necromancy' && turns === null && card.turnDuration != null) {
            turns = card.turnDuration;
        }
        if ((hp !== null && hp <= 0) || (turns !== null && turns <= 0)) {
            this.clearSlave();
            return;
        }
        if (card.kind === 'natural_magic') {
            this.slaveCurrentHp.set(hp);
            this.slaveTurnsRemaining.set(null);
        } else if (card.kind === 'necromancy') {
            this.slaveCurrentHp.set(null);
            this.slaveTurnsRemaining.set(turns);
        } else {
            this.slaveCurrentHp.set(null);
            this.slaveTurnsRemaining.set(null);
        }
    }

    slaveHpPlus(): void {
        const hp = this.slaveCurrentHp();
        if (hp === null) {
            return;
        }
        this.slaveCurrentHp.set(hp + 1);
    }

    slaveHpMinus(): void {
        const hp = this.slaveCurrentHp();
        if (hp === null || hp <= 0) {
            return;
        }
        const next = hp - 1;
        if (next <= 0) {
            this.clearSlave();
        } else {
            this.slaveCurrentHp.set(next);
        }
    }

    slaveTurnMinus(): void {
        const t = this.slaveTurnsRemaining();
        if (t === null || t <= 0) {
            return;
        }
        const next = t - 1;
        if (next <= 0) {
            this.clearSlave();
        } else {
            this.slaveTurnsRemaining.set(next);
        }
    }

    openServantPicker() {
        this.showServantPicker.set(true);
    }

    onServantPickerClosed() {
        this.showServantPicker.set(false);
    }

    onServantPicked(id: number) {
        const card = this.cards.servants.find((c) => c.id === id);
        if (card) {
            this.hasSlave.set(true);
            this.slaveCard.set(card.source);
            this.slaveId.set(card.id);
            this.initSlaveRuntime(card);
        }
        this.showServantPicker.set(false);
    }

    resetCardView() {
        this.selectedCard.set('');
    }

    onActionSheetClosed() {
        this.showActionSheet.set(false);
    }

    onResetAlertDismiss() {
        this.showResetConfirm.set(false);
    }

    onActionSheetSelected(action: any) {
        if(action == 'reset') {
            this.showResetConfirm.set(true);
        }

        if(action == 'share') {
            if (this.bagCards().length == 0) {
                this.showMessage("Você não possui itens para trocar!");
                return;
            }

            this.openChangeModal();
        }
    }

    // MESSAGE CONTROL

    showMessage(message: string) {
        this.messageModal.set(message);

        setTimeout(() => {
            this.messageModal.set("");
        }, 1500);
    }

    //SHUFFLE AND SELECTIONS

    shuffleClass() {
        let result = Math.floor(Math.random() * 4) + 1;
        let selectedClass = this.cards.classes.filter(m => m.id == result)[0];
        this.classCard.set(selectedClass.source);
        this.classId.set(selectedClass.id);
        this.hasClass.set(true);
    }

    shuffleRace() {
        let result = Math.floor(Math.random() * 4) + 1;
        let selectedRace = this.cards.races.filter(m => m.id == result)[0];
        this.raceCard.set(selectedRace.source);
        this.raceId.set(selectedRace.id);
        this.hasRace.set(true);
    }

    selectVD() {
        let vdCards: any = this.cards.vd;
        this.vdCardsForCarousel.set(vdCards);
    }

    selectedVD(id: any) {
        if(id) {
            let vdCards: CardModel[] = this.cards.vd;
            let card = vdCards.filter(c => c.id == id)[0];

            this.vdCardsForCarousel.set([]);
            this.hasVD.set(true);
            this.vdCard.set(card.source);
        } else {
            this.vdCardsForCarousel.set([]);
        }
    }

    // Chest

    public treasureShuffle() {
        let itemCards = this.cards.itens;
        let stoneCards = this.cards.stones;

        let qtdItens = Math.floor(Math.random() * 2) + 1;
        let qtdPedras = Math.floor(Math.random() * 2) + 1;

        for (let index = 0; index < qtdItens; index++) {
            let itemId = Math.floor(Math.random() * 26) + 1;
            let card = itemCards.find(c => c.id == itemId)!;
            
            this.chestReceivedItens.update(cards => [...cards, card]);
        }

        for (let index = 0; index < qtdPedras; index++) {
            let itemId = Math.floor(Math.random() * 4) + 1;
            let card = stoneCards.find(c => c.id == itemId)!;
            
            this.chestReceivedItens.update(cards => [...cards, card]);
        }
        this.openModal()
    }

    openModal() {
        this.modalOpen.set(true);
    }

    closeNewItems(confirmed: boolean) {
        if(confirmed) {
            let newStones = this.chestReceivedItens().filter(c => c.isStone == true);
            let newItems = this.chestReceivedItens().filter(c => c.isStone == false);

            this.bagCards.update(cards => [...cards, ...newItems]);
            this.bagStones.update(stones => [...stones, ...newStones]);
        }
    
        this.modalOpen.set(false);
        this.chestReceivedItens.set([]);
        this.newItensConfirmed.set(false);
    }

    confirmedNewItems() {
        this.newItensConfirmed.set(true);
    }

    //Bag Control

    activeBag() {
        if(this.bagCards().length == 0) return;
        this.showBag.set(true);
    }

    closedBag() {
        this.showBag.set(false);
    }

    selectedAnItem(id: any) {
        let itemCards = this.cards.itens;
        let selectItem = itemCards.filter(c => c.id === id)[0];
        
        if(selectItem.isWeapon) {
            console.log(this.classId(), selectItem.equipInClass);

            if(this.classId() == selectItem.equipInClass) {
                this.hasWeapon.set(true);
                this.weaponCard.set(selectItem.source);
                this.damage.set(this.level() + selectItem.attack);
            } else {
                this.showMessage("Essa arma não equipa na sua classe!");
                this.showBag.set(false);
                return;
            }
        }

        this.bagCards.update(cards => {
            const index = cards.findIndex(c => c.id === id);

            if (index !== -1) {
                cards.splice(index, 1);
            }

            return [...cards]; 
        });

        if(this.bagCards().length == 0) {
            this.showBag.set(false);
        }
    }

    // Item Change
    openChangeModal() {
        this.showChangeModal.set(true);
    }

    changeSent(event: any) {
        if(event) {
            let desiredCard = this.cards.itens.filter(c => c.id == event.desiredItem)[0];
            this.bagCards.update(cards => {
                const index = cards.findIndex(c => c.id === event.myItem);

                if (index !== -1) {
                    cards.splice(index, 1);
                }

                return [...cards]; 
            });
            
            this.bagCards.update(cards => [...cards, desiredCard]);  
        }
        this.showChangeModal.set(false);
    }

    // Buy Spells Control

    openSpellCarousel() {
        this.storeSpellCards.set(this.cards.magic);
    }

    // RESET

    resetGame() {
        this.totalhp.set(25);
        this.hp.set(25);
        this.level.set(1);
        this.dice.set(0);
        this.damage.set(this.level());

        this.selectedCard.set("");

        this.hasClass.set(false);
        this.classCard.set("");

        this.hasRace.set(false);
        this.raceCard.set("");

        this.hasWeapon.set(false);
        this.weaponCard.set("");

        this.clearSlave();

        this.hasVD.set(false);
        this.vdCard.set("");

        this.hasMagic.set(false);
        this.tableCards.set([]);
        this.bagCards.set([]);
        this.bagStones.set([]);
        this.magicCards.set([]);
        this.magicCardsForCarousel.set([]);
        this.storeSpellCards.set([]);
        this.persistence.clear();
    }

   resetWithFlash() {
        this.flashActive.set(true);

        setTimeout(() => {
            this.resetGame();

            setTimeout(() => {
                this.flashActive.set(false);
            }, 150); // tempo do fade-out
        }, 250); // tempo do fade-in
    }
}

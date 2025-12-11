import { Component, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActionConfig } from "./action-config/action-config";
import { Cards } from '../static/cards';
import { CardsScroll } from "./cards-scroll/cards-scroll";
import { CardModel } from '../static/card-model';
import { ModalItensComponent } from './modal-itens/modal-itens';
import { ModalController } from '@ionic/angular';
import { Bag } from "./bag/bag";
import { single } from 'rxjs';
import { MagicCardModel } from '../static/magic-card-model';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [IonicModule, CommonModule, ActionConfig, CardsScroll, Bag],
  templateUrl: './game.html',
  styleUrl: './game.less'
})
export class Game {

    constructor(private modalCtrl: ModalController) {}

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

    // State Control
    flashActive = signal(false);
    showBag = signal(false);
    showActionSheet = signal(false);
    modalOpen = signal(false);
    alertMessage = signal("");

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
    classCard = signal("");

    hasRace = signal(false);
    raceCard = signal("");

    hasWeapon = signal(false);
    weaponCard = signal("");

    hasSlave = signal(false);
    slaveCard = signal("");

    hasVD = signal(false);
    vdCard = signal("");

    hasMagic = signal(false);
    magicCards = signal<MagicCardModel[]>([]);

    vdCardsForCarousel = signal([]);
    magicCardsForCarousel = signal<MagicCardModel[]>([]);
    storeSpellCards = signal<MagicCardModel[]>([]);
    tableCards = signal([]);

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
            this.damage.set(this.damage() + 1);
        }
    }

    levelMinus() {
        if(this.level() > 1) {
            this.level.set(this.level() - 1);
            this.totalhp.set(this.totalhp() - 5);
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
        let chosenSpell = this.cards.magic.filter(c => c.id == cardId)[0];
        
        let arcaneQtd = this.bagStones().filter(c => c.id == 1).length;
        let deathQtd = this.bagStones().filter(c => c.id == 2).length;
        let elementalQtd = this.bagStones().filter(c => c.id == 3).length;
        let holyQtd = this.bagStones().filter(c => c.id == 4).length;

        if(chosenSpell.arcaneCost > arcaneQtd) return;
        if(chosenSpell.deathCost > deathQtd) return;
        if(chosenSpell.elementalCost > elementalQtd) return;
        if(chosenSpell.holyCost > holyQtd) return;
        
        this.removeStonesAfterBuy(1, chosenSpell.arcaneCost);
        this.removeStonesAfterBuy(2, chosenSpell.deathCost);
        this.removeStonesAfterBuy(3, chosenSpell.elementalCost);
        this.removeStonesAfterBuy(4, chosenSpell.holyCost);

        this.storeSpellCards.set([]);
        this.magicCards.update(cards => [...cards, chosenSpell]);
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
    
    resetCardView() {
        this.selectedCard.set('');
    }

    onActionSheetClosed() {
        this.showActionSheet.set(false);
    }

    onActionSheetSelected(action: any) {
        if(action == 'reset') {
            this.resetWithFlash();
        }
    }

    //SHUFFLE AND SELECTIONS

    shuffleClass() {
        let result = Math.floor(Math.random() * 4) + 1;
        let selectedClass = this.cards.classes.filter(m => m.id == result)[0];
        this.classCard.set(selectedClass.source);
        this.hasClass.set(true);
    }

    shuffleRace() {
        let result = Math.floor(Math.random() * 4) + 1;
        let selectedRace = this.cards.races.filter(m => m.id == result)[0];
        this.raceCard.set(selectedRace.source);
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
            this.bagCards.update(cards => [...cards, card]);
            
            this.chestReceivedItens.update(cards => [...cards, card]);
        }

        for (let index = 0; index < qtdPedras; index++) {
            let itemId = Math.floor(Math.random() * 4) + 1;
            let card = stoneCards.find(c => c.id == itemId)!;
            this.bagStones.update(cards => [...cards, card]);
            
            this.chestReceivedItens.update(cards => [...cards, card]);
        }
        this.openModal()
    }

    openModal() {
        this.modalOpen.set(true);
    }

    closeNewItems() {
        this.modalOpen.set(false);
        this.chestReceivedItens.set([]);
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
            this.hasWeapon.set(true);
            this.weaponCard.set(selectItem.source);
            this.damage.set(this.level() + selectItem.attack);
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

        this.hasSlave.set(false);
        this.slaveCard.set("");

        this.hasVD.set(false);
        this.vdCard.set("");

        this.tableCards.set([]); 
        this.bagCards.set([]);
        this.bagStones.set([]);
        this.magicCards.set([]);
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

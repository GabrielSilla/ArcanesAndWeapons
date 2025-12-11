import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CardsScroll } from '../cards-scroll/cards-scroll';

@Component({
    imports: [IonicModule, CommonModule, CardsScroll],
    selector: 'app-bag',
    templateUrl: './bag.html',
    styleUrls: ['./bag.less']
})
export class Bag {
    @Input() showBag = false;
    @Input() bagCards: any = [];
    @Input() stoneCards: any = [];
    @Output() closed = new EventEmitter<void>();
    @Output() usedItem = new EventEmitter<void>();

    selectedCard(id: any) {
        if(id)
            this.usedItem.emit(id);
        else
            this.closed.emit();
    }

    getArcaneStones() {
        return this.stoneCards.filter((c: { id: number; }) => c.id == 1).length;
    }

    getDeathStones() {
        return this.stoneCards.filter((c: { id: number; }) => c.id == 2).length;
    }

    getElementalStones() {
        return this.stoneCards.filter((c: { id: number; }) => c.id == 3).length;
    }

    getHolyStones() {
        return this.stoneCards.filter((c: { id: number; }) => c.id == 4).length;
    }

    closeBag() {
        this.closed.emit();
    }
}
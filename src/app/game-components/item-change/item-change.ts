import { Component, Input, ElementRef, ViewChild, AfterViewInit, signal, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CardModel } from '../../static/card-model';
import { Cards } from '../../static/cards';

@Component({
    imports: [IonicModule, CommonModule],
    standalone: true,
    selector: 'app-item-change',
    templateUrl: './item-change.html',
    styleUrls: ['./item-change.less']
})
export class ItemChange {
    @Input() show: boolean = false;
    @Input() bagItens: CardModel[] = [];
    @Output() return = new EventEmitter<void>();

    myItemId = 0;
    desiredItemId = 0;

    cards = new Cards();

    close() {
        this.return.emit();
    }

    handleMyItem(event: any) {
        this.myItemId = event.detail.value;
    }

    handleDesiredItem(event: any) {
        this.desiredItemId = event.detail.value;
    }

    choose() {
        let obj: any = {
            myItem: this.myItemId,
            desiredItem: this.desiredItemId
        }

        this.return.emit(obj);
    }
}
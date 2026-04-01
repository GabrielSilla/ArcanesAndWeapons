import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import type { ServantCardModel } from '../../static/servant-card-model';

@Component({
    selector: 'app-servant-picker',
    standalone: true,
    imports: [IonicModule, CommonModule],
    templateUrl: './servant-picker.html',
    styleUrl: './servant-picker.less',
})
export class ServantPicker {
    @Input() isOpen = false;
    @Input() servants: ServantCardModel[] = [];

    @Output() closed = new EventEmitter<void>();
    @Output() selected = new EventEmitter<number>();

    onDismiss(): void {
        this.closed.emit();
    }

    pick(id: number): void {
        this.selected.emit(id);
    }

    close(): void {
        this.closed.emit();
    }
}

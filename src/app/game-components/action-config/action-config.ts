import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-config',
  standalone: true,
  imports: [ IonicModule, CommonModule ],
  templateUrl: './action-config.html',
  styleUrl: './action-config.less'
})
export class ActionConfig {
    @Input() showActionSheet = false;
    @Output() closed = new EventEmitter<void>();
    @Output() action = new EventEmitter<void>();

    public actionSheetButtons = [
        {
            text: 'Trocar Item',
            data: {
                action: 'share',
            },
        },
        {
            text: 'Resetar Partida',
            role: 'reset',
            data: {
                action: 'reset',
            },
        },
    ];

    dismiss(ev: any) {
        const action = ev.detail.data?.action;
        this.showActionSheet = false;

        this.closed.emit();
        if(action) {
            this.action.emit(action);
        }
    }
}
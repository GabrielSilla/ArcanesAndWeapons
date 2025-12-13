import { Component, Input, ElementRef, ViewChild, AfterViewInit, signal, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
    imports: [IonicModule, CommonModule],
    standalone: true,
    selector: 'app-messages',
    templateUrl: './messages.html',
    styleUrls: ['./messages.less']
})
export class Messages {
    @Input() message: string = "";
}
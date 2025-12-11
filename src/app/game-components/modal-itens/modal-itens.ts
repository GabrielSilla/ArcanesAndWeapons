import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ IonicModule, CommonModule ],
  selector: 'app-modal-itens',
  templateUrl: './modal-itens.html',
})
export class ModalItensComponent {
  @Input() items: any[] = [];

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss(true);
  }
}
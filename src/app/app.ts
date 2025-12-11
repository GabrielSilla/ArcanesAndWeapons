import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Game } from './game-components/game';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Game, IonicModule],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('aa-game');
  bgN = signal(0);

  constructor() {
    this.getBackground();
  }

  getBackground() {
      let result = Math.floor(Math.random() * 3) + 1;
      this.bgN.set(result);
  }
}

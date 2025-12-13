import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Game } from './game-components/game';
import { IonicModule } from '@ionic/angular';
import { InitScreen } from "./game-components/init-screen/init-screen";
import { single } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Game, IonicModule, InitScreen],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('aa-game');
  bgN = signal(0);
  logoImg = "logo.png";
  gameLogo = "game-logo.png";

  showInit = signal(false);
  initImg = signal("");
  animation = signal("");
  bgAnimation = signal("");

  constructor() {
    this.InitScreen();
    this.getBackground();
  }

  getBackground() {
      let result = Math.floor(Math.random() * 3) + 1;
      this.bgN.set(result);
  }

  InitScreen() {
    this.showInit.set(true);
    this.initImg.set(this.logoImg);
    
    this.animation.set("fade-in");
  
    setTimeout(() => {
      this.animation.set("fade-out");

      setTimeout(() => {
        this.initImg.set(this.gameLogo);
        this.animation.set("fade-in");

        setTimeout(() => {
          this.animation.set("fade-out");
          this.bgAnimation.set("fade-out");

          setTimeout(() => {
            this.showInit.set(false);
          }, 1000);
        }, 4000);
      }, 1000);
    }, 4000);
  }
}

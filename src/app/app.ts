import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Game } from './game-components/game';
import { IonicModule } from '@ionic/angular';
import { InitScreen } from "./game-components/init-screen/init-screen";
import { single } from 'rxjs';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { KeepAwake } from '@capacitor-community/keep-awake';

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
    const width = window.innerWidth;

    if(width > 650)
      this.getBackgroundT();
    else
      this.getBackgroundSP();
  }

  getBackgroundSP() {
      let result = Math.floor(Math.random() * 3) + 1;
      this.bgN.set(result);
  }

  getBackgroundT() {
      let result = Math.floor(Math.random() * 2) + 4;
      this.bgN.set(result);
  }

  async InitScreen() {
    await ScreenOrientation.lock({ orientation: 'portrait' });
    await KeepAwake.keepAwake();
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

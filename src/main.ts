import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { setupIcons } from './icons';

setupIcons(); // <-- REGISTRA OS ÍCONES

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

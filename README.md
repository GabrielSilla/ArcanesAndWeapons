# Arcanes And Weapons

This project was made with Angular + Capacitor JS. It's a card RPG game which will have two main projects. One for the Player and One which will be the storyteller. This app is the player app, which will be used to manage the player cards within the game!

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running Capacitor JS

To genereate the android version with Capacitor JS. You need to build your project with 'ng build' first!

Then:
```bash
npx cap copy
```
This command will copy all contents of the Angular project for a folder named 'android' which will be a gradle Android project.

Then:
```bash
npx cap open android
```

This will run your local Android Studio (should be installed). From there, I recommend you to plug your Android device (Dev mode and USB depuration enabled) with a USB cable, there you should be able to run the app directly to your phone!

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { isPlatform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.configureStatusBar();
    });
  }

  async configureStatusBar() {
    await StatusBar.setOverlaysWebView({ overlay: false }); 

    await StatusBar.setStyle({ style: Style.Light });

    await StatusBar.setBackgroundColor({ color: '#ffffff' });

    await StatusBar.show();
  }
}
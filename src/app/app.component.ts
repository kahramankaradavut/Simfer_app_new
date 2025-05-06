import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';

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
    await StatusBar.setOverlaysWebView({ overlay: false }); // EN ÖNEMLİ SATIR

    // Status bar stilini ayarla (Light: koyu yazı / Dark: açık yazı)
    await StatusBar.setStyle({ style: Style.Light });

    // Arka plan rengini ayarla
    await StatusBar.setBackgroundColor({ color: '#ffffff' });

    // Status bar'ı göster
    await StatusBar.show();
  }
}
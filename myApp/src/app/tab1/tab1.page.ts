import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';         
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { camera } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,
    IonFab,
    IonFabButton,
    IonIcon
  ],
})
export class Tab1Page {
  photo: string | undefined;

  constructor() {
    addIcons({ add });
    addIcons({ camera });
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 90,
      });

      this.photo = image.webPath; // Fotoğrafın URI'sini kaydet
      console.log('Photo taken:', image);
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { add, camera } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonLabel } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
 
    ExploreContainerComponent,

    IonLabel,
    FormsModule,
    IonicModule,
    CommonModule
  ],
})
export class Tab1Page {
  photo: string | undefined;

  formData = {
    kod: '',
    tur: '',
    name: '',
    tutanak: ''
  };

  constructor(private router: Router) {
    addIcons({ add });
    addIcons({ camera });
  };

  submitForm(){
    this.router.navigate(['../tab2/tab2.page'], {
      state: { formData: this.formData }
    });
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        quality: 90,
      });

      this.photo = image.webPath; // Fotoğrafın URI'sini kaydet
      console.log('Photo taken:', image);
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }
}

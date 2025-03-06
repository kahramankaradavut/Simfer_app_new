import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { add, camera, sendOutline } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonInput, IonLabel, IonTextarea, IonItem, IonGrid, IonRow, IonCol, IonCard, IonImg, IonButton,
  IonButtons, IonFab, IonFabButton, IonModal} from '@ionic/angular/standalone';
import { NgIf, NgFor } from '@angular/common';





@Component({
  selector: 'app-tab1',
  standalone: true,
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    ExploreContainerComponent,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonInput, IonLabel, IonTextarea, IonItem, IonGrid, IonRow, IonCol, IonCard, IonImg, IonFab, IonFabButton,
    NgIf, NgFor, IonModal
  ],
})
export class Tab1Page {
  formData = { kod: '', tur: '', name: '', tutanak: '' };
  photos: string[] = [];
  selectedPhoto: string | null = null; // Seçilen fotoğraf
  jsonData: string = '';

  constructor(private router: Router) {
    addIcons({ add, camera, sendOutline });
  };

  

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl, // Base64 formatında fotoğraf al
        source: CameraSource.Prompt,
        quality: 90,
      });

      if (image.dataUrl) {
        this.photos.push(image.dataUrl); // Fotoları diziye ekle
      }
    } catch (error) {
      console.error('Fotoğraf çekme hatası:', error);
    }
  }

  removePhoto(index: number) {
    this.photos.splice(index, 1); // Fotoğrafı diziden çıkar
  }


  openPhoto(photo: string) {
    this.selectedPhoto = photo;
  }

  closePhoto() {
    this.selectedPhoto = null;
  }
  // Form ve fotoları tab2 ye gönder
  submitData() {
    const combinedData = {
      ...this.formData,
      photos: this.photos,
    }

    this.jsonData = JSON.stringify(combinedData, null, 2);
    console.log('JSON Verisi:', this.jsonData);
    console.log('Form Verisi:', this.formData);
    console.log('Fotoğraflar:', this.photos);
    
    this.router.navigate(['/tabs/tab2'], { 
      state: { formData: this.formData, photos: this.photos } 
    });
  }
}

import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { add, camera, sendOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonContent, IonIcon, IonInput, IonTextarea, IonItem, IonGrid, IonRow, IonCol, IonCard, IonImg, IonButton,
  IonButtons, IonFab, IonFabButton, IonAccordionGroup, IonAccordion, IonLabel, LoadingController, ToastController } from '@ionic/angular/standalone';
import { NgIf, NgFor } from '@angular/common';
import { formData } from './formData';
import { PhotoService } from '../services/photo.service';
import { HttpClientModule } from '@angular/common/http';
import { FormService } from '../services/formData.service';


@Component({
  selector: 'app-tab1',
  standalone: true,
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    FormsModule,
    HttpClientModule,
    IonHeader, IonToolbar, IonContent, IonButton, IonButtons, IonIcon, IonInput, IonTextarea, IonItem, IonGrid, IonRow, IonCol, IonCard, IonImg, IonFab, IonFabButton,
    NgIf, NgFor, IonAccordionGroup, IonAccordion, IonLabel
  ],
  // providers: [
  //   PhotoService
  // ]
})
export class Tab1Page {
  formData: formData = {
    code: '',
    type: '',
    name: '',
    productError: '',
    photos: []
  }
  selectedPhoto: string | null = null;


  constructor(private photoService: PhotoService, private formService: FormService, private loadingCtrl: LoadingController, private toastController: ToastController) {
    addIcons({ add, camera, sendOutline });
  }


  async addPhoto() {
    await this.photoService.takePhoto();
    const photos = this.photoService.getPhotos();
    this.formData.photos = photos.map(p => ({
filePath: p.webviewPath ? p.webviewPath : 'default-path',
      fileName: p.webviewPath!.split('/').pop() || 'unknown'
    }));
  }

  async submit() {
    const loading = await this.loadingCtrl.create({
    message: 'Veriler gönderiliyor...',
    spinner: 'crescent'
    });
    try {
      const photos = this.photoService.getPhotos();
  
      this.formData.photos = photos.map(p => ({
        filePath: p.webviewPath ? p.webviewPath : 'default-path',
        fileName: p.webviewPath!.split('/').pop() || 'unknown'
      }));
      console.log('formData.photos (geçici gösterim için): ', this.formData.photos);
  
      this.formService.submitForm(this.formData, photos).subscribe({
        next: () => {
          console.log('Form gönderildi');
  
          this.photoService.clearPhotos();

          this.formData = {
            code: '',
            type: '',
            name: '',
            productError: '',
            photos: []
          };
        },
      });

      const toast = await this.toastController.create({
        message: 'Veri başarıyla kaydedildi!',
        duration: 1500,
        color: 'success'
        });
        toast.present();

    } catch (error) {
      console.error('Veri gönderme hatası:', error);
      const toast = await this.toastController.create({
        message: 'Veri gönderme hatası: ' + ((error as any).message || 'Bilinmeyen hata'),
        duration: 3000,
        color: 'danger'
        });
        toast.present();
    } finally { 
      await loading.dismiss();
    }

  }
  

    // Fotoğrafı büyütme
    openPhoto(photo: string) {
      this.selectedPhoto = photo;
    }
  
    // Fotoğrafı kapatma
    closePhoto() {
      this.selectedPhoto = null;
    }
}
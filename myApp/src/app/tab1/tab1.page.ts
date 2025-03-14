import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, camera, sendOutline } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonContent, IonIcon, IonInput, IonTextarea, IonItem, IonGrid, IonRow, IonCol, IonCard, IonImg, IonButton,
  IonButtons, IonFab, IonFabButton} from '@ionic/angular/standalone';
import { NgIf, NgFor } from '@angular/common';
import { formData } from './formData';
import { LoadingController } from '@ionic/angular';
import { JsonStorageService } from '../services/json-storage.service';
import { ToastController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';



@Component({
  selector: 'app-tab1',
  standalone: true,
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    FormsModule,
    IonHeader, IonToolbar, IonContent, IonButton, IonButtons, IonIcon, IonInput, IonTextarea, IonItem, IonGrid, IonRow, IonCol, IonCard, IonImg, IonFab, IonFabButton,
    NgIf, NgFor
  ],
})

export class Tab1Page {
  formData :formData = new formData('', '', '', '', '', []); // Form verileri
  selectedPhoto: string | null = null; // Seçilen fotoğraf
  jsonData: string = '';

  constructor(private router: Router, private loadingCtrl: LoadingController,   private jsonStorage: JsonStorageService, private toastController: ToastController
) {
    addIcons({ add, camera, sendOutline });
  };

  // Fotoğraf çekme
  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri, // Dosya yolunu al
        source: CameraSource.Prompt,
        quality: 90,
      });
  
      if (image.webPath) {
        this.formData.photos.push(image.webPath); // Fotoğrafın kısa URL’sini kaydet
      }
    } catch (error) {
      console.error('Fotoğraf çekme hatası:', error);
    }
  }

  // Fotoğrafı silme
  removePhoto(index: number) {
    this.formData.photos.splice(index, 1); // Fotoğrafı diziden çıkar
  }


  // Fotoğrafı büyütme
  openPhoto(photo: string) {
    this.selectedPhoto = photo;
  }

  // Fotoğrafı kapatma
  closePhoto() {
    this.selectedPhoto = null;
  }
  // Form ve fotoları tab2 ye gönder
  async submitData() {

    const loading = await this.loadingCtrl.create({
      message: 'Veriler gönderiliyor...',
      spinner: 'crescent'
    });

    await loading.present();

    try {
      const combinedData = {
        ...this.formData,
        id: uuidv4(),  
      };

      this.jsonData = JSON.stringify(combinedData, null, 2);
      await this.jsonStorage.appendFormData(combinedData);
      // console.log('JSON Verisi:', this.jsonData);
      // console.log('Form Verisi:', this.formData);
      // console.log('Fotoğraflar:', this.formData.photos);

      //Verileri sıfırla
      this.formData = new formData('', '', '', '', '', []);
      this.selectedPhoto = null;
      this.jsonData = '';

      
        const toast = await this.toastController.create({
        message: 'Veri başarıyla kaydedildi!',
        duration: 1500,
        color: 'success'
      });
      toast.present();
      
    } catch (error) {
      console.error('Veri gönderme hatası:', error);
    }finally {  
      await loading.dismiss();
    }
  }
  async deleteDatas () {

    const loading = await this.loadingCtrl.create({
      message: 'Veriler gönderiliyor...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
        this.jsonStorage.deleteDatas();

        const toast = await this.toastController.create({
          message: 'Veriler başarıyla silindi!',
          duration: 2000,
          color: 'success'
        });

        toast.present();
        
    } catch (error) {
      console.error('Veri silme hatası:', error);
    } finally {
      await loading.dismiss();
    }   
}



  // WEB JSON KAYDETME
  // downloadJson(data: any) {
  //   const combinedData = {
  //     ...this.formData,
  //     photos: this.formData.photos,
  //   }

  //   this.jsonData = JSON.stringify(combinedData, null, 2);

  //   const blob = new Blob([this.jsonData], { type: 'application/json' });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'data.json';
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // }

  // downloadData() {
  //   this.downloadJson(this.jsonData);
  // }


  // // IOS JSON KAYDETME
  //   async  saveJsonFileIOS(jsonData: any) {
  //   const combinedData = {
  //     ...this.formData,
  //     photos: this.formData.photos,
  //   }

  //   this.jsonData = JSON.stringify(combinedData, null, 2);

  //   await Filesystem.writeFile({  
  //     path: 'data.json',
  //     data: this.jsonData,
  //     directory: Directory.Documents,
  //     encoding: Encoding.UTF8
  //   });

  //   console.log('IOS a veri aktarıldı.');
  // }

  // downloadDataIOS() {
  //   const formData = this.jsonData;
  //   this.saveJsonFileIOS(formData);
  // } 
}

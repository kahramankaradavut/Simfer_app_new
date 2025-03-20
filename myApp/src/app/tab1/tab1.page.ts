import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { add, camera, sendOutline } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonContent, IonIcon, IonInput, IonTextarea, IonItem, IonGrid, IonRow, IonCol, IonCard, IonImg, IonButton,
  IonButtons, IonFab, IonFabButton, IonAccordionGroup, IonAccordion, IonLabel} from '@ionic/angular/standalone';
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


  constructor(private photoService: PhotoService, private formService: FormService) {
    addIcons({ add, camera, sendOutline });
  }


  async addPhoto() {
    await this.photoService.takePhoto();
  }

  async submit() {
    const photos = this.photoService.getPhotos();
    this.formService.submitForm(this.formData, photos).subscribe(() => {
      console.log('Form gönderildi');
      this.photoService.clearPhotos();
    });
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




  // Fotoğraf çekme
  // async takePhoto() {
  //   try {
  //     const image = await Camera.getPhoto({
  //       resultType: CameraResultType.Uri, // Dosya yolunu al
  //       source: CameraSource.Prompt,
  //       quality: 90,
  //     });
  

  //     // FORMDATA daki PHOTOS KISMINA AKTARIM YERİ
  //     if (image.webPath) {
  //       this.formData.photos.push(image.webPath); // Fotoğrafın kısa URL'sini kaydet
  //     }
  //   } catch (error) {
  //     console.error('Fotoğraf çekme hatası:', error);
  //   }
  // }

  // // Fotoğrafı silme
  // removePhoto(index: number) {
  //   this.formData.photos.splice(index, 1); // Fotoğrafı diziden çıkar
  // }



  // async submitData() {
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Veriler gönderiliyor...',
  //     spinner: 'crescent'
  //   });

  //   await loading.present();

  //   try {
  //     // Önce fotoğrafları API'ye gönder
  //     const photoGuids = [];
  //     for (const photo of this.formData.photos) {
  //       try {
  //         // Base64'ten Blob'a çevir
  //         const response = await fetch(photo);
  //         const blob = await response.blob();
          
  //         // Blob'u File'a çevir
  //         const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
          
  //         // API'ye gönder
  //         console.log('AAAAAA: ', this.photoService.uploadPhoto(file).toPromise())
  //         const result = await this.photoService.uploadPhoto(file).toPromise();
  //         if (result && result.guid) {
  //           photoGuids.push(result.guid);
  //         }
  //       } catch (error: any) {
  //         console.error('Fotoğraf yükleme hatası:', error);
  //         throw new Error(`Fotoğraf yükleme hatası: ${error.message || 'Bilinmeyen hata'}`);
  //       }
  //     }

  //     // Form verilerini ve fotoğraf GUID'lerini kaydet
  //     const combinedData = {
  //       ...this.formData,
  //       id: uuidv4(),
  //     };

  //     console.log('COMBINED: ', combinedData)
  //     console.log('FORMDATA: ', this.formData)
  //     this.jsonData = JSON.stringify(combinedData, null, 2);
  //     await this.jsonStorage.appendFormData(combinedData);

  //     // Verileri sıfırla
  //     this.formData = new formData('', '', '', '', '', []);
  //     this.selectedPhoto = null;
  //     this.jsonData = '';

  //     const toast = await this.toastController.create({
  //       message: 'Veri başarıyla kaydedildi!',
  //       duration: 1500,
  //       color: 'success'
  //     });
  //     toast.present();
    
  //   } catch (error: any) {
  //     console.error('Veri gönderme hatası:', error);
  //     const toast = await this.toastController.create({
  //       message: 'Veri gönderme hatası: ' + (error.message || 'Bilinmeyen hata'),
  //       duration: 3000,
  //       color: 'danger'
  //     });
  //     toast.present();
  //   } finally {  
  //     await loading.dismiss();
  //   }
  // }

//   async deleteDatas () {
//     console.log('Gönderilecek veri:');

//     const loading = await this.loadingCtrl.create({
//       message: 'Veriler gönderiliyor...',
//       spinner: 'crescent'
//     });
//     await loading.present();

//     try {
//         this.jsonStorage.deleteDatas();

//         const toast = await this.toastController.create({
//           message: 'Veriler başarıyla silindi!',
//           duration: 2000,
//           color: 'success'
//         });

//         toast.present();
        
//     } catch (error) {
//       console.error('Veri silme hatası:', error);
//     } finally {
//       await loading.dismiss();
//     }   
// }

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
  // } }

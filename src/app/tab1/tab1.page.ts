import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { add, camera, sendOutline, logOutOutline, scanCircleOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { formData } from './formData';
import { PhotoService } from '../services/photo.service';
import { HttpClientModule } from '@angular/common/http';
import { FormService } from '../services/formData.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ErrorCodeService } from '../services/errorCode.service';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { ErrorCode } from '../tab1/errorCode';
import { TourService } from '../services/tour.service';
import {
  IonHeader, 
  IonToolbar, 
  IonContent, 
  IonIcon, 
  IonInput, 
  IonTextarea,
  IonItem, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonImg, 
  IonButton,
  IonButtons, 
  IonFab, 
  IonFabButton, 
  IonText, 
  IonAccordionGroup, 
  IonAccordion, 
  IonLabel, 
  LoadingController,
  ToastController, 
  IonSelectOption, 
  IonSelect, 
  IonCardHeader, 
  IonCardTitle
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-tab1',
  standalone: true,
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonCardTitle, 
    IonCardHeader,
    FormsModule,
    HttpClientModule,
    IonHeader, 
    IonToolbar, 
    IonContent, 
    IonButton, 
    IonButtons, 
    IonIcon, 
    IonInput, 
    IonTextarea, 
    IonItem, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonCard, 
    IonImg, 
    IonFab, 
    IonFabButton,
    NgIf, 
    NgFor, 
    IonAccordionGroup, 
    IonText, 
    IonAccordion, 
    IonLabel, 
    IonSelectOption, 
    IonSelect
  ],

})
export class Tab1Page {
  formData: formData = {
    id: 0,
    code: '',
    type: '',
    name: '',
    productError: '',
    band: 2,
    quantity: 1,
    errorCode: { id: 0, code: '', description: '' },
    photos: [],
    status: 'Pending'
  }
  submitted = false;
  errorCodes: ErrorCode[] = [];
  quantityOptions = Array.from({ length: 100 }, (_, i) => i + 1);

  ionViewWillEnter() {
    const username = this.authService.getUsername();
    if (!username) return this.authService.logout();

    this.formData = this.getEmptyForm();
    this.formData.name = username;
    this.submitted = false;
    this.fetchErrorCodes();

    const userId = localStorage.getItem('username'); // 'currentUserId' değil, 'username' olacak
    if (userId) {
      const tourKey = `formTourShown1_${userId}`;
      console.log('Tour Key:', tourKey);
      const hasSeenTour = localStorage.getItem(tourKey);
      
      if (!hasSeenTour) {
        setTimeout(() => {
          this.tourService.startTourSendForm();
          localStorage.setItem(tourKey, 'true');
        }, 500);
      }
    }
  }
  selectedPhoto: string | null = null;


  constructor(
    private photoService: PhotoService,
    private formService: FormService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private authService: AuthService,
    private errorCodeService: ErrorCodeService,
    private tourService: TourService,

  ) {
    addIcons({ add, camera, logOutOutline, sendOutline, scanCircleOutline });
  }

  async scanBarcode() {
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL,
        scanInstructions: 'Lütfen barkodu kameraya getirin',
        scanButton: true,
        scanText: 'Barkod Tara',
      });

      if (result?.ScanResult) {
        this.formData.code = result.ScanResult;
        this.presentToast('Barkod başarıyla tarandı!', 'success');
      } else {
        this.presentToast('Barkod taranamadı!', 'warning');
      }
    } catch (error) {
      this.presentToast('Barkod tarama hatası: ' + ((error as any)?.message || 'Bilinmeyen hata'), 'danger');
    }
  }

  async addPhoto() {
    await this.photoService.takePhoto();
    this.updatePhotoData();
  }

  async submit() {
    this.submitted = true;
    if (!this.formData.code || !this.formData.type) return;
    if (this.formData.photos.length === 0) {
      return this.presentToast('Lütfen fotoğraf yükleyin!', 'warning');
    }
    const loading = await this.loadingCtrl.create({ message: 'Veriler gönderiliyor...', spinner: 'crescent' });
    await loading.present();
    try {
      this.updatePhotoData();
      this.formService.submitForm(this.formData, this.photoService.getPhotos()).subscribe(() => {
        this.presentToast('Veri başarıyla kaydedildi!', 'success');
        this.ionViewWillEnter();
      });
    } catch (error) {
      this.presentToast('Veri gönderme hatası: ' + ((error as any)?.message || 'Bilinmeyen hata'), 'danger');
    } finally {
      await loading.dismiss();
    }
  }

  // Fotoğrafı büyütme
  openPhoto(photo: string) {

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('formTourShown1_')) {
        localStorage.removeItem(key);
        i--; 
      }
    }
    


    this.selectedPhoto = photo;
  }

  // Fotoğrafı kapatma
  closePhoto() {
    this.selectedPhoto = null;
  }

  async logout() {
    this.authService.logout();
  }

  onErrorCodeChange() {
    const selected = this.errorCodes.find(ec => ec.code === this.formData.errorCode.code);
    if (selected) {
      this.formData.errorCode.id = selected.id;
      this.formData.errorCode.description = selected.description;
    }
  }

  fetchErrorCodes() {
    this.errorCodeService.getErrorCodes().subscribe(data => this.errorCodes = data);
  }

  private async presentToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({ message, duration: 2000, color });
    await toast.present();
  }

  clearPage() {
    this.photoService.clearPhotos();
    this.formData = this.getEmptyForm();
    this.submitted = false;
  }

  private updatePhotoData() {
    const photos = this.photoService.getPhotos();
    this.formData.photos = photos.map(p => ({
      filePath: p.webviewPath ?? 'default-path',
      fileName: p.webviewPath?.split('/').pop() ?? 'unknown'
    }));
  }

  private getEmptyForm(): formData {
    return {
      id: 0,
      code: '',
      type: '',
      name: '',
      productError: '',
      band: 2,
      quantity: 1,
      errorCode: { id: 0, code: '', description: '' },
      photos: [],
      status: 'Pending'
    };
  }

}
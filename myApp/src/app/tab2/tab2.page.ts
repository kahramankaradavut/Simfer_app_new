import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormService } from '../services/formData.service';
import { formData } from '../tab1/formData';
import {
  IonHeader, IonList, IonToolbar, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol,
  IonImg, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton, IonButtons,
  LoadingController, ToastController
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-tab2',
  standalone: true,
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonHeader, IonList, IonToolbar, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol,
    CommonModule, IonImg, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton, IonButtons
  ]
})


export class Tab2Page {
selectedPhoto: string | null = null;

  forms: formData[] = [];
  constructor(private formService: FormService, private loadingCtrl: LoadingController, private toastController: ToastController) {}

  async ionViewWillEnter() {

    const loading = await this.loadingCtrl.create({
      message: 'Veriler gönderiliyor...',
      spinner: 'crescent'
      });

  try {
    this.formService.getForms().subscribe((data) => {
      this.forms = data;
    });

    const toast = await this.toastController.create({
      message: 'Veri başarıyla getirildi!',
      duration: 1500,
      color: 'success'
      });
      toast.present();
  } catch (error) {
    console.error('Veriler alınamadı:', error);
    const toast = await this.toastController.create({
      message: 'Veri getirme hatası: ' + ((error as any).message || 'Bilinmeyen hata'),
      duration: 3000,
      color: 'danger'
      });
      toast.present();
  } finally {
    await loading.dismiss();
  }
}
  openPhoto(photo: string) {
    this.selectedPhoto = photo;
  }
  
  closePhoto() {
    this.selectedPhoto = null;
  }

  clearDatabase() {
    this.formService.clearData().subscribe({
      next: () => {
        console.log('Veritabanı temizlendi');
        // Opsiyonel: Kullanıcıya başarı mesajı gösterebilirsiniz
      },
      error: (err) => {
        console.error('Veritabanı temizlenemedi:', err);
        // Opsiyonel: Kullanıcıya hata mesajı gösterebilirsiniz
      }
    });
  }
}
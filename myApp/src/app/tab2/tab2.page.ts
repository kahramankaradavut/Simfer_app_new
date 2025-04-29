import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormService } from '../services/formData.service';
import { FormsModule } from '@angular/forms';
import { formData } from '../tab1/formData';
import { lastValueFrom } from 'rxjs';
import {
  IonHeader, IonList, IonToolbar, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol,
  IonImg, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton,
  LoadingController, ToastController, IonText, IonSelectOption, IonSelect
} from '@ionic/angular/standalone';
import { downloadOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tab2',
  standalone: true,
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    FormsModule,
    IonHeader, IonList, IonToolbar, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol,
    CommonModule, IonImg, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton, IonText,
    IonSelectOption, IonSelect
  ]
})
export class Tab2Page {
  selectedPhoto: string | null = null;
  excelExportLink: string | null = null;
  forms: formData[] = [];

  constructor(
    private formService: FormService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) {
    addIcons({ downloadOutline });
  }

  private async presentToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({ message, duration: 2000, color });
    await toast.present();
  }

  async ionViewWillEnter() {
    const loading = await this.loadingCtrl.create({
      message: 'Veriler getiriliyor...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      this.formService.getForms().subscribe(data => {
        this.forms = data;
      });
      this.presentToast('Veri başarıyla getirildi!', 'success');
    } catch (error) {
      console.error('Veriler alınamadı:', error);
      this.presentToast('Veri getirme hatası: ' + ((error as any).message || 'Bilinmeyen hata'), 'danger');
    } finally {
      await loading.dismiss();
    }
  }

  openPhoto(photo: string) {
    this.selectedPhoto = photo;
    console.log('FORMDATA:', this.forms);
    console.log('quantity:', this.forms[0].quantity);
  }

  closePhoto() {
    this.selectedPhoto = null;
  }

  async updateFormStatus(form: formData) {
    const loading = await this.loadingCtrl.create({
      message: 'Durum güncelleniyor...',
      spinner: 'crescent'
    });
    await loading.present();

    this.formService.updateFormStatus(form.id, form.status).subscribe({
      next: async () => {
        await loading.dismiss();
        this.presentToast('Durum başarıyla güncellendi.', 'success');
      },
      error: async (error) => {
        console.error('Durum güncellenemedi:', error);
        await loading.dismiss();
        this.presentToast('Yetkiniz yok!', 'danger');
      }
    });
  }

  async getExportLink() {
    this.excelExportLink = null;
    const loading = await this.loadingCtrl.create({
      message: 'Link alınıyor...',
      spinner: 'crescent'
    });
    await loading.present();

    this.formService.getExcelExportLink().subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.excelExportLink = res.fileUrl;
        this.presentToast('Link başarıyla alındı!', 'success');
      },
      error: async (err) => {
        console.error('Link alınamadı', err);
        await loading.dismiss();
        this.presentToast('Link alınamadı!', 'danger');
      }
    });
  }

  async deleteForm(id: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Siliniyor...',
      spinner: 'circles'
    });
    await loading.present();

    try {
      await lastValueFrom(this.formService.deleteForm(id));
      this.forms = this.forms.filter(f => f.id !== id);
      await loading.dismiss();
      this.presentToast('Form başarıyla silindi.', 'success');
    } catch (err) {
      console.error('Form silinemedi:', err);
      await loading.dismiss();
      this.presentToast('Yetkiniz yok!', 'danger');
    }
  }

  async clearDatabase() {
    const loading = await this.loadingCtrl.create({
      message: 'Siliniyor...',
      spinner: 'circles'
    });
    await loading.present();

    this.formService.clearData().subscribe({
      next: async () => {
        await loading.dismiss();
        this.presentToast('Form başarıyla silindi.', 'success');
      },
      error: async (err) => {
        console.error('Veritabanı temizlenemedi:', err);
        await loading.dismiss();
        this.presentToast('Yetkiniz yok!', 'danger');
      }
    });
  }
}

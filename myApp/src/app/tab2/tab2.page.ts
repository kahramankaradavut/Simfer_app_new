import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormService } from '../services/formData.service';
import { formData } from '../tab1/formData';
import { lastValueFrom } from 'rxjs';
import {
  IonHeader, IonList, IonToolbar, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol,
  IonImg, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton, IonButtons,
  LoadingController, ToastController, IonIcon
} from '@ionic/angular/standalone';
import { downloadOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tab2',
  standalone: true,
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonHeader, IonList, IonToolbar, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol,
    CommonModule, IonImg, IonIcon, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton, IonButtons
  ]
})


export class Tab2Page {
selectedPhoto: string | null = null;

  forms: formData[] = [];
  constructor(private formService: FormService, private loadingCtrl: LoadingController, private toastController: ToastController) {
    addIcons({ downloadOutline });

  }

  async ionViewWillEnter() {
    const loading = await this.loadingCtrl.create({
      message: 'Veriler getiriliyor...',
      spinner: 'crescent'
      });
      await loading.present();

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
    console.log('FORMDATA: ',this.forms)
    console.log('quantity: ',this.forms[0].quantity)

  }
  
  closePhoto() {
    this.selectedPhoto = null;
  }

  async downloadExcel() {
    const loading = await this.loadingCtrl.create({
      message: 'Veriler indiriliyor...',
      spinner: 'crescent'
    });
    await loading.present();
  
    this.formService.downloadExcel().subscribe({
      next: async (blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'FormVerileri.xlsx';
        link.click();
        window.URL.revokeObjectURL(link.href);
  
        const toast = await this.toastController.create({
          message: 'Veriler başarıyla indirildi!',
          duration: 1500,
          color: 'success'
        });
        toast.present();
      },
      error: async (error) => {
        console.error('Veriler indirilemedi:', error);
        const toast = await this.toastController.create({
          message: 'Yetkiniz yok!',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        await loading.dismiss(); 

      },
      complete: async () => {
        await loading.dismiss();
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
      this.forms = this.forms.filter(f => f.id !== id); // UI'dan kaldır
      await loading.dismiss();
  
      const toast = await this.toastController.create({
        message: 'Form başarıyla silindi.',
        duration: 1500,
        color: 'success'
      });
      toast.present();
  
    } catch (err) {
      await loading.dismiss();
      console.error('Form silinemedi:', err);
      const toast = await this.toastController.create({
        message: 'Yetkiniz yok!',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
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
        const toast = await this.toastController.create({
          message: 'Form başarıyla silindi.',
          duration: 1500,
          color: 'success'
        });
        toast.present();
        // Opsiyonel: Kullanıcıya başarı mesajı gösterebilirsiniz
      },
      error: async (err) => {
        console.error('Veritabanı temizlenemedi:', err);
        await loading.dismiss();
  
        const toast = await this.toastController.create({
          message: 'Yetkiniz yok!',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }
}
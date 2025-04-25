import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonCard,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonList,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonModal,
  IonTitle,
  AlertController,
  LoadingController,
  ToastController
} from '@ionic/angular/standalone';

import { UserService } from '../services/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ErrorCodeService } from '../services/errorCode.service';
import { ErrorCode } from '../tab1/errorCode';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { camera, logOutOutline, sendOutline, scanCircleOutline, trash, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],

  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonIcon,
    IonToolbar,
    IonButtons,
    IonButton,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonList,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonModal,
    IonTitle
  ]
})
export class UserManagementPage {
  users: any[] = [];
  newUser = { username: '', passwordHash: '', role: '' };
  isEditModalOpen = false;
  selectedUser: any = {};
  newErrorCode: Partial<ErrorCode> = { code: '', description: '' };

  newError = {
    code: '',
    description: ''
  };
  
  errorCodes: any[] = [];
  
  selectedError: any = {};
  isEditErrorModalOpen = false;
  

  constructor(
    private userService: UserService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private authService: AuthService,
    private errorCodeService: ErrorCodeService,
  ) {
    addIcons({ camera, logOutOutline, sendOutline, scanCircleOutline, trash, createOutline });

  }

  async ionViewWillEnter() {
    const loading = await this.loadingCtrl.create({
      message: 'Veriler getiriliyor...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      this.userService.getUsers().subscribe((data) => {
        this.users = data;
      });
      this.loadErrorCodes();

      this.presentToast('Veriler Başarıyla getirildi!', 'success');

    } catch (error) {
      console.error('Veriler alınamadı:', error);
      this.presentToast('Veri getirme hatası!', 'danger');

    } finally {
      await loading.dismiss();
    }
  }

  async loadErrorCodes() {
    const loading = await this.loadingCtrl.create({
      message: 'Hata kodları yükleniyor...',
      spinner: 'crescent'
    });
    await loading.present();

    this.errorCodeService.getErrorCodes().subscribe({
      next: async (data) => {
        this.errorCodes = data;
        await loading.dismiss();
      },
      error: async (err) => {
        await loading.dismiss();
        console.error('Hata kodları alınamadı:', err);
        this.presentToast('Hata kodları yüklenemedi!', 'danger');
      }
    });
  }

  async addErrorCode() {
    const { code, description } = this.newErrorCode;

    if (!code?.trim() || !description?.trim()) {
      this.presentToast('Tüm alanları doldurun!', 'warning');
    }
    const loading = await this.loadingCtrl.create({
      message: 'Hata kodu ekleniyor...',
      spinner: 'crescent'
    });
    await loading.present();

    this.errorCodeService.createErrorCode({ code, description } as ErrorCode).subscribe({
      next: async () => {
        await loading.dismiss();
        this.presentToast('Hata kodu başarıyla eklendi!', 'success');

        this.newErrorCode = { code: '', description: '' };
        this.loadErrorCodes(); // Yeni kayıt sonrası listeyi güncelle
      },
      error: async (error) => {
        await loading.dismiss();
        this.presentToast('Hata kodu eklenirken sorun oluştu!', 'danger');
        console.error('Hata kodu ekleme hatası:', error);
      }
    });
  }

  async deleteErrorCode(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Silme Onayı',
      message: 'Bu hata kodunu silmek istediğinize emin misiniz?',
      buttons: [
        { text: 'İptal', role: 'cancel' },
        {
          text: 'Sil',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Hata kodu siliniyor...',
              spinner: 'crescent'
            });
            await loading.present();
            this.errorCodeService.deleteErrorCode(id).subscribe({
              next: async () => {
                await loading.dismiss();
                this.presentToast('Hata kodu silindi!', 'success');
                this.loadErrorCodes(); // Silme sonrası listeyi güncelle
              },
              error: async (error) => {
                await loading.dismiss();
                console.error('Hata kodu silme hatası:', error);
                this.presentToast('Hata kodu silinirken hata oluştu!', 'danger');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async openErrorModal(errorCode: any) {
    this.selectedError = { ...errorCode }
    this.isEditErrorModalOpen = true;
  }

  closedErrorModal() {
    this.isEditErrorModalOpen = false;
  }
  async openEditErrorModal(errorCode: any) {
    console.log('Edit Error Code:', errorCode);
    this.selectedError = { ...errorCode };
    this.isEditErrorModalOpen = true;
  }

  async updateErrorCode() {
    const loading = await this.loadingCtrl.create({
      message: 'Güncelleniyor...',
      spinner: 'crescent'
    });
    await loading.present();
    this.errorCodeService.updateErrorCode(this.selectedError).subscribe({
      next: async () => {
        this.isEditErrorModalOpen = false;
        this.presentToast('Hata kodu güncellendi!', 'success');
        loading.dismiss();
        this.loadErrorCodes(); // Güncelleme sonrası listeyi güncelle
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Hata kodu güncelleme hatası:', error);
        this.presentToast('Hata kodu güncellenirken sorun oluştu!', 'danger');
      }
    });
    this.closedErrorModal();
  }

  async addUser() {
    if (!this.newUser.username || !this.newUser.passwordHash || !this.newUser.role) {
      this.presentToast('Lütfen tüm alanları doldurun!', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Kullanıcı ekleniyor...',
      spinner: 'crescent'
    });
    await loading.present();

    this.userService.addUser(this.newUser).subscribe({
      next: async () => {
        this.newUser = { username: '', passwordHash: '', role: '' };
        this.presentToast('Kullanıcı eklendi!', 'success');
        loading.dismiss();
        this.ionViewWillEnter();
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Kullanıcı ekleme hatası:', error);
        this.presentToast('Kullanıcı eklenirken hata oluştu!', 'danger');
      }
    });
  }

  async deleteUser(userId: number) {
    const alert = await this.alertCtrl.create({
      header: 'Silme Onayı',
      message: 'Bu kullanıcıyı silmek istediğinize emin misiniz?',
      buttons: [
        { text: 'İptal', role: 'cancel' },
        {
          text: 'Sil',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Kullanıcı siliniyor...',
              spinner: 'crescent'
            });
            await loading.present();

            this.userService.deleteUser(userId).subscribe({
              next: async () => {
                await loading.dismiss();
                this.presentToast('Kullanıcı silindi!', 'success');
                this.ionViewWillEnter();
              },
              error: async (err) => {
                await loading.dismiss();
                console.error('Delete error:', err);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  openEditModal(user: any) {
    this.selectedUser = { ...user };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  editUser(user: any) {
    this.selectedUser = { ...user };
    this.selectedUser.passwordHash = '';
    this.isEditModalOpen = true;
  }

  async updateUser() {
    const loading = await this.loadingCtrl.create({
      message: 'Güncelleniyor...',
      spinner: 'crescent'
    });
    await loading.present();

    this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
      next: async () => {
        this.isEditModalOpen = false;
        this.presentToast('Kullanıcı güncellendi!', 'success');
        loading.dismiss();
        this.ionViewWillEnter();
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Kullanıcı güncelleme hatası:', error);
      }
    });

    this.closeEditModal();
  }

  async logout() {
    this.authService.logout();
  }

  private async presentToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({ message, duration: 2000, color });
    await toast.present();
  }
}

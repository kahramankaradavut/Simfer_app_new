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
  standalone: true,
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
  
  selectedError: ErrorCode = { id: 0, code: '', description: '' };
  isEditErrorModalOpen = false;
  

  constructor(
    private userService: UserService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private authService: AuthService,
    private errorCodeService: ErrorCodeService,
    private router: Router
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
        const toast = await this.toastController.create({
          message: 'Hata kodları yüklenemedi!',
          color: 'danger',
          duration: 2000
        });
        await toast.present();
      }
    });
  }

  async addErrorCode() {
    const { code, description } = this.newErrorCode;

    if (!code?.trim() || !description?.trim()) {
      const toast = await this.toastController.create({
        message: 'Tüm alanları doldurun!',
        color: 'warning',
        duration: 2000
      });
      return toast.present();
    }

    const loading = await this.loadingCtrl.create({
      message: 'Hata kodu ekleniyor...',
      spinner: 'crescent'
    });
    await loading.present();

    this.errorCodeService.createErrorCode({ code, description } as ErrorCode).subscribe({
      next: async () => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Hata kodu başarıyla eklendi!',
          color: 'success',
          duration: 2000
        });
        await toast.present();
        this.newErrorCode = { code: '', description: '' };
        this.loadErrorCodes(); // Yeni kayıt sonrası listeyi güncelle
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Hata kodu eklenemedi:', error);
        const toast = await this.toastController.create({
          message: 'Hata kodu eklenirken sorun oluştu!',
          color: 'danger',
          duration: 2000
        });
        await toast.present();
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
                const toast = await this.toastController.create({
                  message: 'Hata kodu silindi!',
                  color: 'success',
                  duration: 2000
                });
                await toast.present();
                this.loadErrorCodes(); // Silme sonrası listeyi güncelle
              },
              error: async (error) => {
                await loading.dismiss();
                console.error('Hata kodu silme hatası:', error);
                const toast = await this.toastController.create({
                  message: 'Hata kodu silinirken sorun oluştu!',
                  color: 'danger',
                  duration: 2000
                });
                await toast.present();
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async editErrorCode(errorCode: ErrorCode) {
    console.log('Edit Error Code:', errorCode);
    const loading = await this.loadingCtrl.create({
      message: 'Güncelleniyor...',
      spinner: 'crescent'
    });
    await loading.present();

    this.errorCodeService.updateErrorCode(errorCode).subscribe({
      next: async () => {
        this.isEditErrorModalOpen = false;
        const toast = await this.toastController.create({message: 'Hata kodu güncellendi!', color: 'success', duration: 2000});
        toast.present();
        loading.dismiss();
        this.loadErrorCodes(); // Güncelleme sonrası listeyi güncelle
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Hata kodu güncelleme hatası:', error);
        const toast = await this.toastController.create({
          message: 'Hata kodu güncellenirken sorun oluştu!',
          color: 'danger',
          duration: 2000
        });
        await toast.present();
      }
    });
    this.closeErrorCodeEditModal();
  }
  async openErrorCodeEditModal(errorCode: ErrorCode) {
    this.newErrorCode = { ...errorCode };
    this.isEditErrorModalOpen = true;
  }
  closeErrorCodeEditModal() {
    this.isEditErrorModalOpen = false;
    this.newErrorCode = { code: '', description: '' }; // Modal kapandığında formu sıfırla
  }

  async addUser() {
    if (!this.newUser.username || !this.newUser.passwordHash || !this.newUser.role) {
      const toast = await this.toastController.create({ message: 'Lütfen tüm alanları doldurun!', color: 'warning', duration: 2000 });
      await toast.present();
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
        const toast = await this.toastController.create({ message: 'Kullanıcı eklendi!', color: 'success', duration: 2000 });
        toast.present();
        loading.dismiss();
        this.ionViewWillEnter();
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Kullanıcı ekleme hatası:', error);
        const toast = await this.toastController.create({ message: 'Kullanıcı eklenirken hata oluştu!', color: 'danger', duration: 2000 });
        toast.present();
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
                const toast = await this.toastController.create({
                  message: 'Kullanıcı silindi!',
                  color: 'success',
                  duration: 2000
                });
                await toast.present();
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
        const toast = await this.toastController.create({ message: 'Kullanıcı güncellendi!', duration: 2000, color: 'success' });
        toast.present();
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
}

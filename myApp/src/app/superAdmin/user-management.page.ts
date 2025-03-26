import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class UserManagementPage {
  users: any[] = [];
  newUser = { username: '', password: '', role: '' }; // Yeni kullanıcı için geçici nesne
  isEditModalOpen = false;
  selectedUser = { id: 0, username: '', password: '', role: '' };

  constructor(
    private userService: UserService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  ionViewWillEnter() {
    this.loadUsers();
  }

  async loadUsers() {
    const loading = await this.loadingCtrl.create({ message: 'Kullanıcılar yükleniyor...' });
    await loading.present();
    try {
      this.userService.getUsers().subscribe({
        next: (data) => {
          this.users = data;
        },
        
      });
    } catch (error) {
      console.error('Kullanıcıları getirme hatası:', error);
      const toast = await this.toastController.create({ message: 'Kullanıcıları yüklerken hata oluştu!', color: 'danger', duration: 2000 });
      await toast.present();
    } finally {
      await loading.dismiss();
    }

    if (this.authService.getRole() !== 'SuperAdmin') {
      const toast = await this.toastController.create({ message: 'Kullanıcıları yüklerken hata oluştu!', color: 'danger', duration: 2000 });
      await toast.present();
    }
    
  }

  async addUser() {
    if (!this.newUser.username || !this.newUser.password || !this.newUser.role) {
      const toast = await this.toastController.create({ message: 'Lütfen tüm alanları doldurun!', color: 'warning', duration: 2000 });
      await toast.present();
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Kullanıcı ekleniyor...' });
    await loading.present();

    this.userService.addUser(this.newUser).subscribe({
      next: async () => {
        this.newUser = { username: '', password: '', role: '' }; // Formu sıfırla
        await this.loadUsers(); // Kullanıcı listesini güncelle
        const toast = await this.toastController.create({ message: 'Kullanıcı eklendi!', color: 'success', duration: 2000 });
        await toast.present();
      },
      error: async () => {
        const toast = await this.toastController.create({ message: 'Kullanıcı eklenirken hata oluştu!', color: 'danger', duration: 2000 });
        await toast.present();
      },
      complete: () => loading.dismiss()
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
            const loading = await this.loadingCtrl.create({ message: 'Kullanıcı siliniyor...' });
            await loading.present();

            try {
              this.userService.deleteUser(userId).subscribe({
                next: async () => {
                  await this.loadUsers();
                  const toast = await this.toastController.create({ message: 'Kullanıcı silindi!', color: 'success', duration: 2000 });
                  await toast.present();
                },
              });
            } catch (error) {
                const toast = await this.toastController.create({ message: 'Kullanıcı silinirken hata oluştu!', color: 'danger', duration: 2000 });
                await toast.present();
            } finally {
              await loading.dismiss();
              this.ionViewWillEnter();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  openEditUser(user: any) {
    console.log('Düzenleme için açılan kullanıcı:', user);
    this.selectedUser = { ...user };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  updateUser() {
    this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
      next: async () => {
        this.loadUsers();
        this.closeEditModal();
        const toast = await this.toastController.create({
          message: 'Kullanıcı başarıyla güncellendi!',
          duration: 1500,
          color: 'success'
        });
        toast.present();
      },
      error: async (err) => {
        console.error('Güncelleme hatası:', err);
        const toast = await this.toastController.create({
          message: 'Güncelleme başarısız: ' + (err.message || 'Bilinmeyen hata'),
          duration: 3000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }

  async logout() {
    this.authService.logout();
  }
}

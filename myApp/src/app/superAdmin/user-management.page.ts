import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class UserManagementPage implements OnInit {
  users: any[] = [];
  newUser = { name: '', email: '', role: '' }; // Yeni kullanıcı için geçici nesne

  constructor(
    private userService: UserService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    const loading = await this.loadingCtrl.create({ message: 'Kullanıcılar yükleniyor...' });
    await loading.present();

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: async (error) => {
        console.error('Kullanıcıları getirme hatası:', error);
        const toast = await this.toastController.create({ message: 'Kullanıcıları yüklerken hata oluştu!', color: 'danger', duration: 2000 });
        await toast.present();
      },
      complete: () => loading.dismiss()
    });
  }

  async addUser() {
    if (!this.newUser.name || !this.newUser.email || !this.newUser.role) {
      const toast = await this.toastController.create({ message: 'Lütfen tüm alanları doldurun!', color: 'warning', duration: 2000 });
      await toast.present();
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Kullanıcı ekleniyor...' });
    await loading.present();

    this.userService.addUser(this.newUser).subscribe({
      next: async () => {
        this.newUser = { name: '', email: '', role: '' }; // Formu sıfırla
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

            this.userService.deleteUser(userId).subscribe({
              next: async () => {
                await this.loadUsers();
                const toast = await this.toastController.create({ message: 'Kullanıcı silindi!', color: 'success', duration: 2000 });
                await toast.present();
              },
              error: async () => {
                const toast = await this.toastController.create({ message: 'Kullanıcı silinirken hata oluştu!', color: 'danger', duration: 2000 });
                await toast.present();
              },
              complete: () => loading.dismiss()
            });
          }
        }
      ]
    });

    await alert.present();
  }
}

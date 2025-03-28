import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { NavController, ToastController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonContent, IonCardContent, IonIcon, IonInput, IonTextarea, IonItem, IonGrid, IonRow, IonCol, IonCard, IonImg, IonButton,
  IonButtons, IonTitle, IonLabel} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
  IonicModule, CommonModule, FormsModule
  ]
})
export class LoginPage {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  async login() {

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: async (res) => {
        this.authService.setToken(res.token, res.role);

        const toast = await this.toastController.create({
          message: 'Giriş başarılı',
          duration: 1500,
          color: 'success',
        });
        toast.present();
        
        if (res.role === 'SuperAdmin') {
          this.navCtrl.navigateRoot('/superAdmin');
        } else {
          this.navCtrl.navigateRoot('/tabs');
        }
      },
      error: async (res) => {
        const toast = await this.toastController.create({
          message: 'Giriş başarısız!',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      },
    });
  }
}

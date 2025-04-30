import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { 
  IonInputPasswordToggle, 
  IonHeader, 
  IonToolbar, 
  IonContent, 
  IonCard, 
  IonCardContent, 
  IonItem, 
  IonButton, 
  IonInput 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
  CommonModule, 
  FormsModule, 
  IonInputPasswordToggle, 
  IonHeader, 
  IonToolbar, 
  IonContent, 
  IonCard, 
  IonCardContent, 
  IonItem, 
  IonButton, 
  IonInput
  ]
})
export class LoginPage {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,  
    private loadingCtrl: LoadingController,
  ) {}

  async login() {
    // const loading = await this.loadingCtrl.create({
    //   message: 'Giriş yapılıyor...',
    //   spinner: 'crescent',
    //   duration: 5000 
    // });
    // await loading.present();
  
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: async (res) => {
        // await loading.dismiss(); 
        this.authService.setToken(res.token, res.role, this.username);
        console.log('Giriş başarılı:', res);
        console.log('Kullanıcı rolü:', res.role);
  
        if (res.role === 'SuperAdmin') {
          this.router.navigate(['/superAdmin']);
        } else {
          this.router.navigateByUrl('/', { replaceUrl: true }).then(() => {
            this.router.navigateByUrl('/tabs/tab1');
          });
        }
      },
      error: async (err) => {
        // await loading.dismiss(); 
        // const toast = await this.toastController.create({
        //   message: 'Kullanıcı adı veya şifre hatalı.',
        //   duration: 3000,
        //   color: 'danger',
        //   position: 'bottom'
        // });
        // await toast.present();
        console.error('Giriş hatası:', err);
      }
    });
  }  
}

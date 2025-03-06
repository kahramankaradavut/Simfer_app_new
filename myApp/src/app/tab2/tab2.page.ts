import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonImg } from '@ionic/angular/standalone'

@Component({
  selector: 'app-tab2',
  standalone: true,
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, CommonModule, IonImg]
})
export class Tab2Page {
  formData: any = {};
  photos: string[] = [];
  selectedPhoto: string | null = null; // Seçilen fotoğraf
  
  constructor(private router: Router) {
    const navState = this.router.getCurrentNavigation()?.extras.state;
    if(navState) {
      this.formData = navState['formData'] || {};
      this.photos = navState['photos'] || [];
    }
  }

  
  openPhoto(photo: string) {
    this.selectedPhoto = photo;
  }

  closePhoto() {
    this.selectedPhoto = null;
  }
}

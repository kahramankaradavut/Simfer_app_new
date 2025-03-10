import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { IonHeader, IonNote, IonList, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonImg, IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/angular/standalone'


@Component({
  selector: 'app-tab2',
  standalone: true,
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonNote, IonList, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, CommonModule, IonImg, IonAccordion, IonAccordionGroup, IonItem, IonLabel]
})

export class Tab2Page {
  formData: any = {};
  photos: string[] = [];
  selectedPhoto: string | null = null;
  
  constructor(private router: Router) {
    const navState = this.router.getCurrentNavigation()?.extras.state;
console.log(this.formData);
    if(navState) {
      this.formData = navState['formData'] || {};
      this.photos = navState['formData.photos'] || [];
    }
  }
  
  openPhoto(photo: string) {
    this.selectedPhoto = photo;
  }

  closePhoto() {
    this.selectedPhoto = null;
  }
}

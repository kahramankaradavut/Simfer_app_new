import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import {
  IonHeader, IonList, IonToolbar, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol,
  IonImg, IonAccordion, IonAccordionGroup, IonItem, IonLabel
} from '@ionic/angular/standalone';

import { JsonStorageService } from '../services/json-storage.service';

@Component({
  selector: 'app-tab2',
  standalone: true,
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonHeader, IonList, IonToolbar, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol,
    CommonModule, IonImg, IonAccordion, IonAccordionGroup, IonItem, IonLabel
  ]
})
export class Tab2Page {
  selectedPhoto: string | null = null;
  formDatas: any[] = [];

  constructor(private jsonStorageService: JsonStorageService) {}

  async ionViewWillEnter() {
    try {
      this.formDatas = await this.jsonStorageService.getAllFormData();
    } catch (error) {
      console.error('Veri yüklenemedi:', error);
    }

    
  }

  openPhoto(photo: string) {
    this.selectedPhoto = photo;
  }

  closePhoto() {
    this.selectedPhoto = null;
  }
}

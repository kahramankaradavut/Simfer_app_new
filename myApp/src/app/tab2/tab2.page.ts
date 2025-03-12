import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonHeader, IonList, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonImg, IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/angular/standalone'
import { FormDataService } from '../services/formData.service';
import { formData } from '../tab1/formData';


@Component({
  selector: 'app-tab2',
  standalone: true,
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonList, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, CommonModule, IonImg, IonAccordion, IonAccordionGroup, IonItem, IonLabel]
})

export class Tab2Page {
  formData: formData | null = null;
  selectedPhoto: string | null = null;
  formDatas: formData[] = [];
  
  constructor(private formDataService: FormDataService) {}
    
  ionViewWillEnter() {
    this.formDatas = this.formDataService.getAllFormDatas();
  }
  openPhoto(photo: string) {
    this.selectedPhoto = photo;
  }

  closePhoto() {
    this.selectedPhoto = null;
  }
}

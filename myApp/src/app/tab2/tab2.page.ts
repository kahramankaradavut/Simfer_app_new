import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormService } from '../services/formData.service';
import { formData } from '../tab1/formData';
import {
  IonHeader, IonList, IonToolbar, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol,
  IonImg, IonAccordion, IonAccordionGroup, IonItem, IonLabel
} from '@ionic/angular/standalone';


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

  forms: formData[] = [];

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.formService.getForms().subscribe((data) => {
      this.forms = data;
    });
  }
  openPhoto(photo: string) {
    this.selectedPhoto = photo;
  }
  
  closePhoto() {
    this.selectedPhoto = null;
  }
}






// export class Tab2Page {
//   selectedPhoto: string | null = null;
//   formDatas: any[] = [];

//   constructor(private router: Router) {}

//   async ionViewWillEnter() {
    
//   }



//   logout() {
//     localStorage.removeItem('isLoggedIn');
//     this.router.navigateByUrl('/login', { replaceUrl: true });
//   }
  
// }

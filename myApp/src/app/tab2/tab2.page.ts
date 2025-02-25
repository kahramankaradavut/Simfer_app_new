import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-tab2',
  standalone: true,
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class Tab2Page {
  formData: any = {};
  photos: string[] = [];
  
  constructor(private router: Router) {
    const navState = this.router.getCurrentNavigation()?.extras.state;
    if(navState) {
      this.formData = navState['formData'] || {};
      this.photos = navState['photos'] || [];
    }
  }
}

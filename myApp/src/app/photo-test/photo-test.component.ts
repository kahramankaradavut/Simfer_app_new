import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-photo-test',
  template: `
    <ion-content>
      <ion-item>
        <ion-label>Fotoğraf Seç</ion-label>
        <ion-button (click)="fileInput.click()">Seç</ion-button>
        <input #fileInput type="file" (change)="onFileSelected($event)" style="display: none" accept="image/*">
      </ion-item>

      <ion-item>
        <ion-label>GUID ile Fotoğraf Getir</ion-label>
        <ion-input [(ngModel)]="photoGuid" placeholder="GUID girin"></ion-input>
        <ion-button (click)="getPhoto()">Getir</ion-button>
      </ion-item>

      <div *ngIf="selectedImage">
        <img [src]="selectedImage" alt="Seçilen fotoğraf">
      </div>

      <div *ngIf="uploadStatus">
        <p>{{ uploadStatus }}</p>
      </div>

      <div *ngIf="errorMessage" style="color: red;">
        <p>{{ errorMessage }}</p>
      </div>
    </ion-content>
  `,
  styles: [`
    img {
      max-width: 100%;
      height: auto;
    }
  `]
})
export class PhotoTestComponent implements OnInit {
  selectedImage: string | null = null;
  photoGuid: string = '';
  uploadStatus: string = '';
  errorMessage: string = '';

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    console.log('Component initialized');
  }

  onFileSelected(event: any) {
    try {
      const file = event.target.files[0];
      if (!file) {
        this.errorMessage = 'Dosya seçilmedi';
        return;
      }

      console.log('Seçilen dosya:', file.name);
      console.log('Dosya boyutu:', file.size);
      
      this.uploadStatus = 'Yükleniyor...';
      this.errorMessage = '';
      
      this.photoService.uploadPhoto(file).subscribe({
        next: (response) => {
          console.log('API Yanıtı:', response);
          if (response && response.guid) {
            this.photoGuid = response.guid;
            this.uploadStatus = `Yükleme başarılı! GUID: ${response.guid}`;
            console.log('GUID:', response.guid);
          } else {
            this.errorMessage = 'Yükleme başarılı ancak GUID alınamadı';
            console.error('GUID bulunamadı:', response);
          }
        },
        error: (error) => {
          this.errorMessage = `Yükleme hatası: ${error.message || 'Bilinmeyen hata'}`;
          console.error('Fotoğraf yükleme hatası:', error);
        }
      });
    } catch (error) {
      this.errorMessage = `Beklenmeyen hata: ${error}`;
      console.error('Beklenmeyen hata:', error);
    }
  }

  getPhoto() {
    if (!this.photoGuid) {
      this.errorMessage = 'Lütfen bir GUID girin';
      return;
    }

    console.log('Fotoğraf getiriliyor, GUID:', this.photoGuid);
    this.photoService.getPhoto(this.photoGuid).subscribe({
      next: (blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImage = e.target?.result as string;
          console.log('Fotoğraf başarıyla yüklendi');
        };
        reader.readAsDataURL(blob);
      },
      error: (error) => {
        this.errorMessage = `Fotoğraf getirme hatası: ${error.message || 'Bilinmeyen hata'}`;
        console.error('Fotoğraf getirme hatası:', error);
      }
    });
  }
}
import { Injectable, Inject } from '@angular/core';
import { Camera, CameraResultType, CameraSource,  } from '@capacitor/camera';
import { photoData } from '../tab1/photoData';
import { HttpClient } from '@angular/common/http';  // HttpClient'ı doğru import et


@Injectable({ providedIn: 'root' })
export class PhotoService {
  private photos: photoData[] = [];

  constructor(private http: HttpClient) {}

  async takePhoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      allowEditing: false,
      quality: 80
    });

    const response = await fetch(capturedPhoto.webPath!);
    const blob = await response.blob();
    const file = new File([blob], `${new Date().getTime()}.jpeg`, { type: 'image/jpeg' });

    this.photos.push({
      filePath: capturedPhoto.path || '',
      webviewPath: capturedPhoto.webPath || '',
      file: file
    });
  }

  getPhotos(): photoData[] {
    return this.photos;
  }

  clearPhotos() {
    this.photos = [];
  }
}
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








// @Injectable({
//   providedIn: null
// })
// export class PhotoService {
//   private apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient) {
//     console.log('API URL:', this.apiUrl);
//   }

//   private handleError(error: HttpErrorResponse) {
//     let errorMessage = 'Bir hata oluştu';
//     if (error.error instanceof ErrorEvent) {
//       // Client-side error
//       errorMessage = `Hata: ${error.error.message}`;
//     } else {
//       // Server-side error
//       errorMessage = `Sunucu Hatası: ${error.status} ${error.message}`;
//       console.error('Sunucu yanıtı:', error.error);
//       console.error('Hata detayları:', {
//         status: error.status,
//         statusText: error.statusText,
//         url: error.url,
//         headers: error.headers,
//         error: error.error
//       });
//     }
//     console.error(errorMessage);
//     return throwError(() => new Error(errorMessage));
//   }

//   uploadPhoto(file: File): Observable<any> {
//     const formData = new FormData();
//     formData.append('file', file);
    
//     console.log('Fotoğraf yükleniyor...');
//     console.log('Dosya adı:', file.name);
//     console.log('Dosya boyutu:', file.size);
//     console.log('Dosya tipi:', file.type);
//     console.log('Endpoint:', `${this.apiUrl}/api/Photos/upload`);
    
//     // FormData içeriğini kontrol et
//     console.log('FormData içeriği:', {
//       file: file.name,
//       size: file.size,
//       type: file.type
//     });
    
//     return this.http.post(`${this.apiUrl}/api/Photos/upload`, formData, {
//       observe: 'response',
//       reportProgress: true
//     }).pipe(
//       tap(response => {
//         console.log('Upload başarılı!');
//         console.log('Status:', response.status);
//         console.log('Headers:', response.headers);
//         console.log('Body:', response.body);
//         //console.log('AAAAA: ', response.body);
//         if (response.body && typeof response.body === 'object') {
//           console.log('Response içeriği:', JSON.stringify(response.body, null, 2));
//         }
//       }),
//       catchError(error => {
//         console.error('Upload hatası:', error);
//         if (error instanceof HttpErrorResponse) {
//           console.error('HTTP Hata Detayları:', {
//             status: error.status,
//             statusText: error.statusText,
//             url: error.url,
//             headers: error.headers,
//             error: error.error
//           });
//         }
//         return this.handleError(error);
//       })
//     );
//   }

//   getPhoto(guid: string): Observable<Blob> {
//     console.log('Fotoğraf getiriliyor...');
//     console.log('GUID:', guid);
//     console.log('Endpoint:', `${this.apiUrl}/api/Photos/get/${guid}`);
    
//     return this.http.get(`${this.apiUrl}/api/Photos/get/${guid}`, { 
//       responseType: 'blob',
//       observe: 'response'
//     }).pipe(
//       tap(response => {
//         console.log('Get photo başarılı!');
//         console.log('Status:', response.status);
//         console.log('Headers:', response.headers);
//         console.log('Body size:', (response.body as Blob).size);
//       }),
//       map(response => response.body as Blob),
//       catchError(error => {
//         console.error('Get photo hatası:', error);
//         if (error instanceof HttpErrorResponse) {
//           console.error('HTTP Hata Detayları:', {
//             status: error.status,
//             statusText: error.statusText,
//             url: error.url,
//             headers: error.headers,
//             error: error.error
//           });
//         }
//         return this.handleError(error);
//       })
//     );
//   }
// }

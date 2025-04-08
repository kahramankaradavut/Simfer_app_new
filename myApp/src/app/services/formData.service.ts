import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formData } from '../tab1/formData';
import { photoData } from '../tab1/photoData';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Browser } from '@capacitor/browser';


@Injectable({ providedIn: 'root' })
export class FormService {
  private apiUrl = 'https://api2.sersim.com.tr/api/Forms'; 

  constructor(private http: HttpClient) {}

  submitForm(form: formData, photos: photoData[]): Observable<any> {
    const formDataPayload = new FormData();
    formDataPayload.append('code', form.code);
    formDataPayload.append('type', form.type);
    formDataPayload.append('name', form.name);
    formDataPayload.append('productError', form.productError);
  
    photos.forEach((photo, index) => {
      formDataPayload.append('photos', photo.file!, photo.file!.name);
    });
  
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.post(this.apiUrl, formDataPayload, { headers });
  }

  getForms(): Observable<formData[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.get<formData[]>(this.apiUrl, { headers });
  }

  deleteForm(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }  
  
  downloadExcel() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    this.http.get('https://api2.sersim.com.tr/api/Forms/export', {
      headers,
      responseType: 'blob'  // Dosya olarak almak için 'blob' kullanıyoruz
    }).subscribe((res: Blob) => {
      const url = window.URL.createObjectURL(res);  // Blob'dan URL oluştur
      const link = document.createElement('a');
      link.href = url;
      link.download = 'FormVerileri.xlsx';  // Dosya adı
      link.click();  // Otomatik olarak indirilmesini sağla
      window.URL.revokeObjectURL(url);  // URL'yi serbest bırak
    }, (error) => {
      console.error('Download error:', error);
    });
  }
  
  
  

  clearData(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/clear`, { headers });
  }


}



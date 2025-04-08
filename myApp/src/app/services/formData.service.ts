import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formData } from '../tab1/formData';
import { photoData } from '../tab1/photoData';

@Injectable({ providedIn: 'root' })
export class FormService {
  private apiUrl = 'https://localhost:5113/api/Forms'; 

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
    this.http.get('http://localhost:5113/api/Forms/export', { responseType: 'blob' })
      .subscribe((response: Blob) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'FormVerileri.xlsx';
        link.click();
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



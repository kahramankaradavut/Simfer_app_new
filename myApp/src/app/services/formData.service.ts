import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { formData } from '../tab1/formData';
import { photoData } from '../tab1/photoData';


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
  
  downloadExcel(): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.get('https://api2.sersim.com.tr/api/Forms/export', {
      headers,
      observe: 'response',
      responseType: 'blob' as 'json'
    }).pipe(
      // response'tan sadece blob kısmını alıyoruz
      // ama response'la birlikte filename'e de ihtiyacın varsa,
      // daha kapsamlı bir model döndürmek de mümkün
      map(response => {
        const contentDisposition = response.headers.get('Content-Disposition');
        const filename = contentDisposition?.split('filename=')[1]?.replace(/"/g, '') || 'FormVerileri.xlsx';
  
        const blob = new Blob([response.body! as Blob], { type: (response.body! as Blob).type });
  
        // Optional: filename'i de birlikte döndürmek istersen şöyle dönebilirsin:
        // return { blob, filename };
        return blob;
      })
    );
  }
  

  clearData(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/clear`, { headers });
  }


}



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { formData } from '../tab1/formData';
import { photoData } from '../tab1/photoData';


@Injectable({ providedIn: 'root' })
export class FormService {
  // private apiUrl = 'http://localhost:5113/api/Forms';
  private apiUrl = 'https://api2.sersim.com.tr/api/Forms'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  submitForm(form: formData, photos: photoData[]): Observable<any> {
    console.log('Form data:', form);
    const formDataPayload = new FormData();
    formDataPayload.append('code', form.code);
    formDataPayload.append('type', form.type);
    formDataPayload.append('name', form.name);
    formDataPayload.append('productError', form.productError);
    formDataPayload.append('band', form.band.toString());
    formDataPayload.append('quantity', form.quantity.toString());
    formDataPayload.append('errorCodeId', form.errorCode.id.toString());
    formDataPayload.append('errorCode', form.errorCode.code);
    formDataPayload.append('errorCodeDescription', form.errorCode.description);
  
    photos.forEach((photo, index) => {
      formDataPayload.append('photos', photo.file!, photo.file!.name);
    });
    
    return this.http.post(this.apiUrl, formDataPayload, { headers: this.getAuthHeaders() });
  }

  getForms(): Observable<formData[]> {
    return this.http.get<formData[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  deleteForm(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }  
  
  getExcelExportLink(): Observable<{ fileUrl: string }> {
    return this.http.get<{ fileUrl: string }>(`${this.apiUrl}/export-link`, { headers: this.getAuthHeaders() });
  }

  updateFormStatus(id: number, status: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    console.log('Updating form status:', status);
    return this.http.put(`${this.apiUrl}/${id}/status`, JSON.stringify(status), { headers });
  }
  
  clearData(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear`, { headers: this.getAuthHeaders() });
  }
}



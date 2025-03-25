import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formData } from '../tab1/formData';
import { photoData } from '../tab1/photoData';

@Injectable({ providedIn: 'root' })
export class FormService {
  private apiUrl = 'http://localhost:5113/api/Forms'; 

  constructor(private http: HttpClient) {}

  submitForm(form: formData, photos: photoData[]): Observable<any> {
    const formData = new FormData();
    formData.append('code', form.code);
    formData.append('type', form.type);
    formData.append('name', form.name);
    formData.append('productError', form.productError);

    photos.forEach((photo, index) => {
      formData.append('photos', photo.file!, photo.file!.name);
    });

    return this.http.post(this.apiUrl, formData);
  }

  getForms(): Observable<formData[]> {
    return this.http.get<formData[]>(this.apiUrl);
  }

  clearData(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear`);
  }


}



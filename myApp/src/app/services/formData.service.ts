import { Injectable } from '@angular/core';
import { formData } from '../tab1/formData';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private _formData: formData | null = null;

  constructor() {}

  setFormData(data: formData) {
    this._formData = data;
  }

  getFormData(): formData | null {
    return this._formData;
  }

  clearFormData() {
    this._formData = null;
  }

  getAllFormDatas(): formData[] {
    return this._formData ? [this._formData] : [];  // Tüm form verilerini döndür
  }
}

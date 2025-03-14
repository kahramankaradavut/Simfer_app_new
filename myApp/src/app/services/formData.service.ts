// import { Injectable } from '@angular/core';
// import { formData } from '../tab1/formData';

// @Injectable({
//   providedIn: 'root'
// })
// export class FormDataService {

//   private STORAGE_KEY = 'formDataList';


//   constructor() {}

//   async addFormData(data: formData) {
//     const existingData = await this.getAllFormData();
//     existingData.push(data);
//     localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingData));
//   }

//   async getAllFormData(): Promise<formData[]> {
//     const stored = localStorage.getItem(this.STORAGE_KEY);
//     return stored ? JSON.parse(stored) : [];
//   }

//   async clearAll() {
//     localStorage.removeItem(this.STORAGE_KEY);
//   }
// }

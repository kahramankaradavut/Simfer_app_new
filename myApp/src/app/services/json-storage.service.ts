// src/app/services/json-storage.service.ts
import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { LoadingController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

export class JsonStorageService {
  private filePath = 'data.json';

  // Form verisi ekle
  async appendFormData(newForm: any) {
    try {
      let dataList: any[] = [];

      // Mevcut verileri oku
      try {
        const result = await Filesystem.readFile({
          path: this.filePath,
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });


        let parsedData: any;

        if (typeof result.data === 'string') {
          parsedData = JSON.parse(result.data);
        } else {
          console.warn('Boş dizi başlatılıyor.');
          parsedData = [];
        }

        // Dizi kontrolü
        if (Array.isArray(parsedData)) {
          dataList = parsedData;
        } else if (typeof parsedData === 'object') {
          dataList = [parsedData];
        } else {
          console.warn('Beklenmeyen veri yapısı, boş dizi başlatılıyor.');
        }

      } catch (e) {
        console.log('Dosya bulunamadı, yeni dosya oluşturulacak.');
      }

      // Yeni form verisini listeye ekle
      dataList.push(newForm);
      // JSON olarak dosyaya yaz
      await Filesystem.writeFile({
        path: this.filePath,
        data: JSON.stringify(dataList, null, 2),
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      console.log('Veri başarıyla kaydedildi.');
    } catch (err) {
      console.error('appendFormData error:', err);
    }
  }

  // Tüm verileri oku
  async getAllFormData(): Promise<any[]> {
    try {
      const result = await Filesystem.readFile({
        path: this.filePath,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
  
      let parsedData: any;
  
      if (typeof result.data === 'string') {
        parsedData = JSON.parse(result.data);
      } else if (result.data instanceof Blob) {
        const text = await result.data.text();
        parsedData = JSON.parse(text);
      }
  
      // Tüm elemanları normalize et (string → object)
      if (Array.isArray(parsedData)) {
        parsedData = parsedData.map(item => {
          if (typeof item === 'string') {
            try {
              return JSON.parse(item);
            } catch (e) {
              console.error('JSON parse hatası:', e);
              return null;
            }
          }
          return item;
        });
      }
      return parsedData;
    } catch (error) {
      console.error('Veri okunurken hata oluştu:', error);
      return [];
    }
  }
  
  async deleteDatas (){
    try {
    Filesystem.deleteFile({
      path: this.filePath,
      directory: Directory.Documents
    }).then(() => {
      console.log('Dosya başarıyla silindi');
    }).catch(error => {
      console.error('Dosya silme hatası:', error);
    });
    } catch (error) {
      console.error('Veri silme hatası:', error);
    } 
    
  }
}

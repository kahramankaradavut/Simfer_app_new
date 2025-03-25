export class formData {
    public code: string;
    type: string;
    name: string;
    productError: string;
    photos: {filePath: string, fileName: string} [];
  
    constructor(code: string, type: string, name: string, productError: string, photos: string[]) {
      this.code = code;
      this.type = type;
      this.name = name;
      this.productError = productError;
      this.photos = photos.map(photo => ({ 
        filePath: photo, 
        fileName: photo.split('/').pop() || '' 
    }));
    }
    
    
}

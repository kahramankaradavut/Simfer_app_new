import { ErrorCode } from './errorCode';

export class formData {
    id: number;
    public code: string;
    type: string;
    name: string;
    productError: string;
    band: number;
    quantity: number;
    errorCode: ErrorCode;
    photos: {filePath: string, fileName: string} [];
    status!: string;
  
    constructor(id: number, code: string, type: string, name: string, productError: string, band: number, quantity: number, errorCode: ErrorCode | null = null, photos: string[], status = 'Pending') {
      this.id = id;
      this.code = code;
      this.type = type;
      this.name = name;
      this.productError = productError;
      this.band = band;
      this.quantity = quantity;
      this.errorCode = errorCode || { id: 0, code: '', description: '' };
      this.photos = photos.map(photo => ({ 
        filePath: photo, 
        fileName: photo.split('/').pop() || '' 
    }));
      this.status = status;
    }
    
    
}

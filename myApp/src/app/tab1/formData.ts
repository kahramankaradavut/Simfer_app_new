export class formData {
    code: string;
    type: string;
    name: string;
    productError: string;
    photos: string[];
  
    constructor(code: string, type: string, name: string, productError: string, photos: string[]) {
      this.code = code;
      this.type = type;
      this.name = name;
      this.productError = productError;
      this.photos = photos;
    }
    
}

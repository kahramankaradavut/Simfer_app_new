export class formData {
    public id: string;
    public code: string;
    type: string;
    name: string;
    productError: string;
    photos: string[];
  
    constructor(id: string, code: string, type: string, name: string, productError: string, photos: string[]) {
      this.id = id;
      this.code = code;
      this.type = type;
      this.name = name;
      this.productError = productError;
      this.photos = photos;
    }
    
    
}

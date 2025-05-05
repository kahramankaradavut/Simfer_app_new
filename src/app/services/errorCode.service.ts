import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorCode } from '../tab1/errorCode';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ErrorCodeService {
  //private apiUrl = 'http://localhost:5113/api/ErrorCodes';
  private apiUrl = 'https://api2.sersim.com.tr/api/ErrorCodes';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  getErrorCodes(): Observable<ErrorCode[]> {
    return this.http.get<ErrorCode[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createErrorCode(errorCode: ErrorCode): Observable<any> {
    return this.http.post(this.apiUrl, errorCode, { headers: this.getAuthHeaders() });
  }

  updateErrorCode(errorCode: ErrorCode): Observable<any> {
    return this.http.put(`${this.apiUrl}/${errorCode.id}`, errorCode, { headers: this.getAuthHeaders() });
  }
  deleteErrorCode(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}

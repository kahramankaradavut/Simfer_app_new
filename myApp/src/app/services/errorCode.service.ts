import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorCode } from '../tab1/errorCode';


@Injectable({ providedIn: 'root' })
export class ErrorCodeService {
  private apiUrl = 'https://api2.sersim.com.tr/api/ErrorCodes';

  constructor(private http: HttpClient) {}

  getErrorCodes(): Observable<ErrorCode[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<ErrorCode[]>(this.apiUrl, { headers });
  }

  createErrorCode(errorCode: ErrorCode): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, errorCode, { headers });
  }
}

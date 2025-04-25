import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorCode } from '../tab1/errorCode';


@Injectable({ providedIn: 'root' })
export class ErrorCodeService {
  private apiUrl = 'http://localhost:5113/api/ErrorCodes';
  // private apiUrl = 'https://api2.sersim.com.tr/api/ErrorCodes';

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

  updateErrorCode(errorCode: ErrorCode): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/${errorCode.id}`, errorCode, { headers });
  }
  deleteErrorCode(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}

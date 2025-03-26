import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5113/api/Users';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addUser(user: any) {
    return this.http.post(this.apiUrl, user);
  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }

  updateUser(userId: number, user: any) {
    return this.http.put(`${this.apiUrl}/${userId}`, user);
  }
}

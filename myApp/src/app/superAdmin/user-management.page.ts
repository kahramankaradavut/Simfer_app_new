import { HttpClient } from '@angular/common/http';

export class UserManagementPage {
    users: any[] = [];
  
    constructor(private http: HttpClient) {}
  
    ngOnInit() {
      this.fetchUsers();
    }
  
    fetchUsers() {
      this.http.get<any[]>('https://localhost:5001/api/User')
        .subscribe(res => this.users = res);
    }
  
    createUser() {
      // Açılır pencere vs. ile kullanıcı oluşturma formu gösterebilirsin
    }
  
    changeRole(user: any) {
      const newRole = user.role === 'User' ? 'SuperAdmin' : 'User';
      this.http.put(`https://localhost:5001/api/User/${user.id}/role`, { role: newRole })
        .subscribe(() => this.fetchUsers());
    }
  }
  
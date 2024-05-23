import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiUrl = '/api/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.userApiUrl);
  }

  createUser(name: string): Observable<User> {
    const newUser = { name };
    return this.http.post<User>(this.userApiUrl, newUser);
  }

  getUserById(id: number): Observable<any> {
    const url = `${this.userApiUrl}/${id}`;
    return this.http.get(url);
  }

  updateUser(user: User, id: number): Observable<User> {
    const url = `${this.userApiUrl}/${id}`;
    return this.http.put<User>(url, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.userApiUrl}/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}

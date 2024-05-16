import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users';
  }

  signUp(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  login(user: User): Observable<string> {
    return this.http.post<string>(
      `${this.myAppUrl}${this.myApiUrl}/login`,
      user
    );
  }

  recoverPassword(email: string): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/forgot-password`, {
      username: email,
    });
  }

  changePassword(
    newPassword: string,
    confirmPassword: string
  ): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/change-password`, {
      username: localStorage.getItem('username'),
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });
  }
}

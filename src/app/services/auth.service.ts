import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from '../services/token.service';
import { ta } from 'date-fns/locale';






@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/auth`;

  //obeservable session
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable(); //obserbable

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  logIn(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(Response => this.tokenService.saveToken(Response.access_token))
      );
    ;
  }

  profile() {
    // const headers=new HttpHeaders();
    // headers.set('Authorization',`bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`)
      .pipe(
        tap(user => this.user.next(user))
      );
  }

  logout() {
    this.tokenService.removeToken();
  }

}

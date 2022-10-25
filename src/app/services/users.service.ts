import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { zip } from 'rxjs';

import { environment } from '../../environments/environment';
import { User,createUserDTO } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private apiUrl = `${environment.API_URL}/api/users`;
  constructor(
    private http: HttpClient
  ) { }


//create user
  create(dto:createUserDTO){
    return this.http.post<User>(this.apiUrl,dto);
  }

  //get all users
  getAll(){
    return this.http.get<User[]>(this.apiUrl);
  }
}



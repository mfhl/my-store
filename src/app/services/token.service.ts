import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token:string){
   // console.log(token );
  localStorage.setItem('token',token);
  // sessionStorage.setItem('token', token); 
  }

  getToken(){
    const token=localStorage.getItem('token');
    // const token = sessionStorage.getItem('token');  
    return token;
  }
  
  removeToken(){
      // sessionStorage.removeItem('token'); 
      localStorage.removeItem('token');
      // sessionStorage.clear();
  }
}

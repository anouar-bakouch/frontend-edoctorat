import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from "rxjs";
import UserToken from '../models/user-token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _url:string = '';

  private tokenSubject!:BehaviorSubject<UserToken>;
  public token!:Observable<UserToken>;

  constructor (private router:Router , private http:HttpClient){
    this.tokenSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user-token') || '{}'));
    this.token = this.tokenSubject.asObservable();
  }

  public login(email:string,password:string):Observable<UserToken>{
    return this.http.post<UserToken>(this._url,{email,password}).
    pipe(
          (token) =>{
                    const userToken= token ;
                    localStorage.setItem('user-token',JSON.stringify(userToken));
                   // this.tokenSubject.next(userToken);

                    return userToken;
          }
    )
  }

  public logout(){

    localStorage.removeItem('user-token');
  //  this.tokenSubject.next(null);
    this.router.navigate(['/account/login']);

  }

  public getToken():UserToken{
     return this.tokenSubject.value;
  }
 

}

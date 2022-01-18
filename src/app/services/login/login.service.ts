import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  private currentUser: BehaviorSubject<boolean> = new BehaviorSubject(false);
  user$ = this.currentUser.asObservable();

  getUserLogged(state){
    this.currentUser.next(state)
  }

  login(data){
    return this.http.post(`${environment.API}/api/auth/login`,data)
      .pipe(
      tap((res:any)=>{
        localStorage.setItem('token',res.token)
      })
      )
  }



}

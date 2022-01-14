import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(data){
    return this.http.post(`${environment.API}/api/auth/login`,data)
      .pipe(map(res=>res['token']));
  }



}

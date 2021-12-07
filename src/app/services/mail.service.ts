import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private _http:HttpClient) { }


  enviarMail(correo:any){
    return this._http.post(`${environment.API_URL}api/users`,{emailBody:correo});
  }
}

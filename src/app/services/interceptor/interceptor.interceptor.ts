import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const reqClone = req.clone();

    return next.handle(reqClone).pipe(
      catchError(this.manejarError)
    );
  }

  manejarError(error:HttpErrorResponse){
    return throwError(error.error.msg);
  }
}

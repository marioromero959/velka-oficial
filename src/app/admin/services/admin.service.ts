import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,  HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  
  addCategory(category){
    return this.http.post(`${environment.API}/api/categorias`,category)
  }

  editCategory(){}
  addProduct(){}
  editProduct(){}
  deleteCategory(){}
  deleteProduct(){}
}

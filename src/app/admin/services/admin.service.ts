import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,  HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  
  getCategories(){
    return this.http.get(`${environment.API}/api/categorias`)
  }

  addCategory(category){
    return this.http.post(`${environment.API}/api/categorias`,category)
  }

  editCategory(){}

  addProduct(product){
    return this.http.post(`${environment.API}/api/productos`,product)
  }
  
  editProduct(){}
  deleteCategory(){}
  deleteProduct(){}
}

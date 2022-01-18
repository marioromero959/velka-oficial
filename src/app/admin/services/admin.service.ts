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
    const headers = new HttpHeaders({
      'x-token':localStorage.getItem('token')
    })
    return this.http.post(`${environment.API}/api/categorias`,category,{headers})
  }

  editCategory(category){
    const headers = new HttpHeaders({
      'x-token':localStorage.getItem('token')
    })
    return this.http.put(`${environment.API}/api/categorias/${category.categoria}`,{nombre:category.nombre},{headers})
  }

  addProduct(product){
    const headers = new HttpHeaders({
      'x-token':localStorage.getItem('token')
    })
    return this.http.post(`${environment.API}/api/productos`,product,{headers})
  }
  
  editProduct(){}
  deleteCategory(){}
  deleteProduct(){}
}

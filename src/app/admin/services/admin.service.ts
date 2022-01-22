import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,  HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  
  //Categorias
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

  deleteCategory(category){
    const headers = new HttpHeaders({
      'x-token':localStorage.getItem('token')
    })
    return this.http.delete(`${environment.API}/api/categorias/${category.categoria}`,{headers})

  }

  //--
  //Productos
  addProduct(product){
    const headers = new HttpHeaders({
      'x-token':localStorage.getItem('token')
    })
    return this.http.post(`${environment.API}/api/productos`,product,{headers})

  }
  
  editProduct(){}
  deleteProduct(){}
}

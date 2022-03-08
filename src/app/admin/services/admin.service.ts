import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
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
  

  async uploadProductImg(archivo:File,id:string){
    try {
      const url = `${environment.API}/api/uploads/productos/${id}`;
      const formData = new FormData();
      formData.append('archivo',archivo)
      const res = await fetch(url,{
        method:'PUT',
        body:formData
      })
      const data = await res.json()
      console.log(data);

    } catch (error) {
        console.log(error);
        return error
    }
  }


  editProduct(product){
    const headers = new HttpHeaders({
      'x-token':localStorage.getItem('token')
    })
    return this.http.put(`${environment.API}/api/productos/${product.id}`,{nombre:product.nombre,precio:product.precio,descripcion:product.descripcion},{headers})

  }

  deleteProduct(id){
    console.log(id);
    
    const headers = new HttpHeaders({
      'x-token':localStorage.getItem('token')
    })
    return this.http.delete(`${environment.API}/api/productos/${id}`,{headers})

  }
}

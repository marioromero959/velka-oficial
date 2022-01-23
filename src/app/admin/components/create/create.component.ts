import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modalError/modal/modal.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  formularioProducto:FormGroup;
  formularioCategoria:FormGroup;
  imagenProducto:File;
  viewImg:any = '../../../../assets/no-img.png'

  categorias = [];

  constructor(
    private formBuilder: FormBuilder,
    private adminSvc:AdminService,
    public dialog:MatDialog,
  ) { 
    this.formularioProducto = this.formBuilder.group({
      nombre: ['',Validators.required],
      categoria: ['',Validators.required],
      precio: ['',Validators.required],
      img: ['',Validators.required],
      descripcion: ['',Validators.required],
    });
    this.formularioCategoria = this.formBuilder.group({
      editar: this.formBuilder.group({
        categoria: ['',Validators.required],
        nombre: ['',Validators.required],
      }),
      crear: this.formBuilder.group({
        nombre: ['',Validators.required]
      }),
      eliminar: this.formBuilder.group({
        categoria: ['',Validators.required]
      })
    })
  }

  ngOnInit(): void {
    this.getAllcategories()
  }

  getAllcategories(){
    this.adminSvc.getCategories().subscribe((res) =>{
      this.categorias = res['categorias'];
    });
  }

  crearCategoria(){
    if(this.formularioCategoria.get(['crear','nombre']).invalid){
      this.formularioCategoria.get(['crear']).markAllAsTouched();
    }else{
      this.adminSvc.addCategory(this.formularioCategoria.value.crear).subscribe(
        res=>console.log(res),
        err =>{
          this.dialog.open(ModalComponent,{
            disableClose:false,
            data:err.error.msg
        })}
      ) 
    }
  }

  editarCategoria(){
    if(this.formularioCategoria.get(['editar']).invalid){
      this.formularioCategoria.get(['editar']).markAllAsTouched();
    }else{
      this.adminSvc.editCategory(this.formularioCategoria.value.editar).subscribe(
        res=>console.log(res),
        err =>console.log(err)
      )
      console.log(this.formularioCategoria.value.editar);
    }
  }

  eliminarCategoria(){
    if(this.formularioCategoria.get(['eliminar']).invalid){
      this.formularioCategoria.get(['eliminar']).markAllAsTouched();
    }else{
      this.adminSvc.deleteCategory(this.formularioCategoria.value.eliminar).subscribe(
        res=>console.log(res),
        err =>console.log(err)
        )
    }
  }

  //Productos
  cambiarImg(e){
    this.imagenProducto = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e)=>{
      this.viewImg = e.target.result
    }
    if(this.imagenProducto == undefined){
      this.viewImg = '../../../../assets/no-img.png'
    }else{
      reader.readAsDataURL(this.imagenProducto);
    }
  }


  crearProducto(){
    if(this.formularioProducto.invalid){
      this.formularioProducto.markAllAsTouched()
    }else{
      const { categoria, nombre, precio, descripcion } = this.formularioProducto.value
      const product = {nombre, categoria, precio, descripcion}
      this.adminSvc.addProduct(product).subscribe(
        (res:any)=>{
            this.adminSvc.uploadProductImg(this.imagenProducto,res._id)
            .then(img=>console.log(img))
            .catch(error=>console.error(error))
        },
        err =>console.log(err)
      )
    }
  }


}


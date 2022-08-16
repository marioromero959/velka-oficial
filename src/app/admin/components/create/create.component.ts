import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modalError/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  showSpinner:boolean = false
  categorias = [];

  constructor(
    private formBuilder: FormBuilder,
    private adminSvc:AdminService,
    private _snackBar: MatSnackBar,
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

  
  openSnackBar(message:string) {
    this._snackBar.open(message, '', {
      horizontalPosition:'center',
      verticalPosition: 'top',
      duration:2000
    });
  }

  crearCategoria(){
    if(this.formularioCategoria.get(['crear','nombre']).invalid){
      this.formularioCategoria.get(['crear']).markAllAsTouched();
    }else{
      this.showSpinner = true
      this.adminSvc.addCategory(this.formularioCategoria.value.crear).subscribe(
        res=>{
          this.showSpinner = false
          this.openSnackBar("¡Categoria creada correctamente!")
          this.getAllcategories()
        },
        err =>{
          this.showSpinner = false
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
      this.showSpinner = true
      this.adminSvc.editCategory(this.formularioCategoria.value.editar).subscribe(
        res=>{
          this.showSpinner = false
          this.openSnackBar("¡Categoria editada correctamente!")
          this.getAllcategories()
        },
        err =>{
          this.showSpinner = false
          this.dialog.open(ModalComponent,{
            disableClose:false,
            data:err.error.msg
        })}
      )
      // console.log(this.formularioCategoria.value.editar);
    }
  }

  eliminarCategoria(){
    if(this.formularioCategoria.get(['eliminar']).invalid){
      this.formularioCategoria.get(['eliminar']).markAllAsTouched();
    }else{
      this.showSpinner = true
      this.adminSvc.deleteCategory(this.formularioCategoria.value.eliminar).subscribe(
        res=>{
          this.showSpinner = false
          this.openSnackBar("¡Categoria eliminada correctamente!")
          this.getAllcategories()
        },
        err =>{
          this.showSpinner = false
          this.dialog.open(ModalComponent,{
            disableClose:false,
            data:err.error.msg
        })}
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
      this.showSpinner = true
      const { categoria, nombre, precio, descripcion } = this.formularioProducto.value
      const product = {nombre, categoria, precio, descripcion}
      this.adminSvc.addProduct(product).subscribe(
        (res:any)=>{
            this.showSpinner = false
            this.openSnackBar("Producto creado correctamente!")
            this.adminSvc.uploadProductImg(this.imagenProducto,res._id)
            .then(img=>{
              this.formularioProducto.reset()
            })
            .catch(error=>console.error(error))
        },
        err =>{
          this.showSpinner = false
          this.dialog.open(ModalComponent,{
            disableClose:false,
            data:err.error.msg
        })}
      )
    }
  }


}


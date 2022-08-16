import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  
  formularioProducto:FormGroup;
  imagenProducto:File;
  viewImg:any = '../../../../assets/no-img.png'
  categorias = [];
  id:string = ''
  showSpinner:boolean = false
  mode:'indeterminate'

  constructor( 
    private formBuilder: FormBuilder,
    private adminSvc:AdminService,
    public dialogRef: MatDialogRef<ModalComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any 
    ) {
      this.formularioProducto = this.formBuilder.group({
        nombre: ['',Validators.required],
        categoria: ['',Validators.required],
        precio: ['',Validators.required],
        img: [''],
        descripcion: ['',Validators.required],
      });
    }

  ngOnInit(): void {
    const {_id, nombre,precio,categoria, img, descripcion} = this.data
      const producto = {
        nombre,
        categoria:categoria._id,
        precio,
        descripcion
      }
      this.id = _id;
      this.viewImg = img
      this.adminSvc.getCategories().subscribe((res) =>{
        this.categorias = res['categorias'];
      });
      this.cargarProducto(producto)
  }

  openSnackBar(message:string) {
    this._snackBar.open(message, '', {
      horizontalPosition:'center',
      verticalPosition: 'top',
      duration:2000
    });
  }

  cargarProducto(producto){
      this.formularioProducto.patchValue(producto)
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
  
  //TODO: MENSAJE DE ERRORES
    editarProducto(){
      if(this.formularioProducto.invalid){
        this.formularioProducto.markAllAsTouched()
      }else{
        this.showSpinner = true
        const { categoria, nombre, precio, descripcion } = this.formularioProducto.value
        const product = {id:this.id, nombre, categoria, precio, descripcion}
        this.adminSvc.editProduct(product).subscribe(
          (res:any)=>{
            if(this.imagenProducto){
              this.adminSvc.uploadProductImg(this.imagenProducto,res._id)
              .then(img=>console.log(img))
              .catch(error=>console.error(error))
            }
            this.showSpinner = false
            this.openSnackBar("¡Producto editado correctamente!")
            this.dialogRef.close()
          },
          err =>{
            this.openSnackBar(err)
          }
        ) 
      }
    }
}

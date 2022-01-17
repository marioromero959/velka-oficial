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
  categoria = new FormControl('',[Validators.required])
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
      desc: ['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAllcategories()
  }

  getAllcategories(){
    this.adminSvc.getCategories().subscribe((res) =>{
      this.categorias = res['categorias'];
      console.log(this.categorias);
    });
  }

  crearProducto(){
    if(this.formularioProducto.invalid){
      this.formularioProducto.markAllAsTouched()
    }else{
      const { categoria, nombre } = this.formularioProducto.value
      const product = {nombre, categoria}

      this.adminSvc.addProduct(product).subscribe(
        res =>console.log(res),
        err =>console.log(err)
      )
    }
  }

  crearCategoria(){
    if(this.categoria.invalid){
      this.categoria.markAsTouched();
    }else{
      const category = {'nombre':this.categoria.value}
      this.adminSvc.addCategory(category).subscribe(
        res=>console.log(res),
        err =>{
          this.dialog.open(ModalComponent,{
            disableClose:false,
            data:err
        })}
      )
    }
  }
}

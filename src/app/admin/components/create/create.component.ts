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

  constructor(
    private formBuilder: FormBuilder,
    private adminSvc:AdminService,
    public dialog:MatDialog,
  ) { 
    this.formularioProducto = this.formBuilder.group({
      nombre: ['',Validators.required],
      precio: ['',Validators.required],
      img: ['',Validators.required],
      desc: ['',Validators.required],
    })
  }

  ngOnInit(): void {
  }

  crearProducto(){
    if(this.formularioProducto.invalid){
      this.formularioProducto.markAllAsTouched()
    }
    console.log('creado');
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

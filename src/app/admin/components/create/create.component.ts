import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  formularioProducto:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminSvc:AdminService
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
  crearCategoria(category = {nombre: 'blazers'}){
    this.adminSvc.addCategory(category).subscribe(res=>{
      console.log(res);
    },
    err =>{
      console.log(err);
    })
  }

}

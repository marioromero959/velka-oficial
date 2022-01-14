import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  formularioProducto:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
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


}

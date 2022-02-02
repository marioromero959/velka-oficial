import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productos } from 'src/app/admin/interface/product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  disableButton:boolean = false;
  products$:Observable<Productos[]>;
  products:Productos[];
  dataClient: FormGroup;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  envio:string = '';
  user:boolean = false;

  constructor(private orderSvc:OrderService,private _formBuilder: FormBuilder) {
    this.products$ = this.orderSvc.cart$;
    this.products$.subscribe(products => {
      this.products = products;
    })
  }

   ngOnInit() {
    let userInfo = localStorage.getItem('token');

    (userInfo) ? this.user = true : this.user = false;
    
    this.dataClient = this.generateForm();
  }

  generateForm(){
    if(this.user){
      return this._formBuilder.group({
        telefono: [''],
        direction: [''],
        envio: ['', Validators.required],
      });
    }else{
      return this._formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        telefono: [''],
        direction: [''],
        envio: ['', Validators.required],
      }); 
    }
  }

  get nameField(){
    return this.dataClient.get('name');
  }
  get emailField(){
    return this.dataClient.get('email');
  }
  get phField(){
    return this.dataClient.get('telefono');
  }
  get adressField(){
    return this.dataClient.get('direction');
  }
  
  errorEmail(){
    if (this.emailField?.hasError('required')) {
      return 'Debes escribir tu email';
    }
    return this.emailField?.hasError('pattern') ? 'No es un email válido' : '';
  }
  
  addCart(product:Productos){
    this.orderSvc.addCart(product)
  }
  deleteItem(productId){
    this.orderSvc.deleteCart(productId)
  }
  total(){
    let total = this.products
    .map(product=>product.precio)
    .reduce((a,b)=>a+b,0)
    return total
  }

  formaRetiro(e){
    if(e === 'local'){
      this.dataClient.get('telefono').addValidators(Validators.required)
      this.dataClient.get('direction').patchValue('Escribí tu direccion')
    }else{
      console.log('domicilio');
      this.dataClient.get('telefono').patchValue(0)
      this.dataClient.get('direction').addValidators(Validators.required)
    }
    this.envio = e;
    this.dataClient.get('envio').patchValue(e)
  }



    paid(){
      this.orderSvc.modalMP({precioTotal:this.total()}).subscribe(
        res=>{
          var script = document.createElement("script");
        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.type = "text/javascript";
        script.dataset.preferenceId = res.preferenceID;
        document.getElementById("page-content").innerHTML = "";
        document.querySelector("#page-content").appendChild(script);

        },
        err=>console.log(err)
        )
    }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productos } from 'src/app/admin/interface/product';
import { MailService } from 'src/app/services/mail.service';

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

  constructor(private orderSvc:OrderService,private _formBuilder: FormBuilder,private _email: MailService) {
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
        direction: [''],
        envio: [''],
      });
    }else{
      return this._formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        direction: [''],
        envio: [''],
      }); 
    }
  }

  get nameField(){
    return this.dataClient.get('name');
  }
  get emailField(){
    return this.dataClient.get('email');
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
    this.envio = e;
    this.dataClient.get('envio').patchValue(e)
  }

  enviar(){
    if(this.dataClient.valid){
      this._email.enviarMail(this.dataClient.value).subscribe((res:any)=>{
        console.log(res)
      });
    }
  } 

    paid(){
      console.log(this.dataClient);
      
      this.orderSvc.modalMP({precioTotal:this.total()}).subscribe(
        res=>{
          var script = document.createElement("script");
        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.type = "text/javascript";
        script.dataset.preferenceId = res.preferenceID;
        document.getElementById("page-content").innerHTML = "";
        document.querySelector("#page-content").appendChild(script);
        this.enviar();
        },
        err=>console.log(err)
        )
    }
}

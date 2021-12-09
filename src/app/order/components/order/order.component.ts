import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from 'src/app/interface';
import { OrderService } from 'src/app/services/order.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$:Observable<product[]>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;

  constructor(private orderSvc:OrderService,private _formBuilder: FormBuilder) {
    this.products$ = this.orderSvc.cart$;
   }

   ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }


}

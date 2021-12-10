import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/order/order.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderPipe } from './pipes/order.pipe';


@NgModule({
  declarations: [
    OrderComponent,
    OrderPipe
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class OrderModule { }

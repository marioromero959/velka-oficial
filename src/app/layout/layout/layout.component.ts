import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { OrderService } from './../../services/order/order.service';
import { Router } from '@angular/router';
import { product } from './../../shared/interface';
 
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
    badge$:Observable<number>;
    products$:Observable<product[]>;
    productos:any;
    token = false;
    session:string = 'Iniciar'
    
  constructor(
    private breakpointObserver: BreakpointObserver,
    private orderSvc:OrderService,
    private router:Router){
    this.badge$ = this.orderSvc.cart$.pipe(
      map(result => result.length)
    )
    this.products$ = this.orderSvc.cart$
    this.products$.subscribe(products=>{
      this.productos = products;
    })
  }

  ngOnInit() {}

  goToOrder(){
    this.router.navigate(['/order'])
  }
  
  public total() {
    let total = 0;
    this.productos.forEach(p => total += p.precio);
    return total;
  }


  goToLogin(){
    this.router.navigate(['/login'])
  }

  goToRegister(){
    this.router.navigate(['/register'])
  }

}

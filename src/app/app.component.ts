import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { OrderService } from './services/order.service';
import { Router } from '@angular/router';
import { product } from './interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
    badge$:Observable<number>;
    products$:Observable<product[]>;
    products:product[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private orderSvc:OrderService,
    private router:Router){
    this.badge$ = this.orderSvc.cart$.pipe(
      map(result => result.length)
    )
    this.products$ = this.orderSvc.cart$
    this.products$.subscribe(products=>{
      this.products = products;
    })
  }

  goToOrder(){
    this.router.navigate(['/order'])
  }
  
  public total() {
    let total = 0;
    this.products.forEach(p => total += p.precio);
    return total;
  }
}

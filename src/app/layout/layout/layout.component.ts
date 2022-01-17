import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { product } from './../../shared/interface';
import { OrderService } from './../../services/order/order.service';
import { LoginService } from 'src/app/services/login/login.service';
 
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay(850)
  );
    badge$:Observable<number>;
    products$:Observable<product[]>;
    productos:any;
    token:string;
    session:string = 'Iniciar'
    
  constructor(
    private breakpointObserver: BreakpointObserver,
    private orderSvc:OrderService,
    private router:Router,
    private loginSvc:LoginService
    ){
    this.badge$ = this.orderSvc.cart$.pipe(
      map(result => result.length)
    )
    this.products$ = this.orderSvc.cart$
    this.products$.subscribe(products=>{
      this.productos = products;
    })
    this.token = localStorage.getItem('token');
    this.loginSvc.user$.subscribe(res=>{
      if(res  || this.token){
        this.session = 'Cerrar'
      }
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

  goToRegister(){
    this.router.navigate(['/register'])
  }

  outSession(){
    if(this.session === 'Cerrar'){
      localStorage.removeItem('token')
      this.session = 'Iniciar'
    }
  }

}

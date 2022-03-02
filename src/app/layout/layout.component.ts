import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { OrderService } from '../services/order/order.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Productos } from 'src/app/admin/interface/product';
import { slideInAnimation } from '../shared/animations';
 
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations:[
    slideInAnimation
  ]
})
export class LayoutComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay(850)
  );
    badge$:Observable<number>;
    products$:Observable<Productos[]>;
    productos:any;
    token:string;
    session:string = 'Iniciar'
    count = 0
  constructor(
    private route:ActivatedRoute,
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
  
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
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

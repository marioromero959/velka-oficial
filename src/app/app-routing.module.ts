import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {
    path: '',
    component: LayoutComponent,
    children:[
    {
      path: '',
      pathMatch:'full',
      redirectTo: '/home',
    },
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
      path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
      path: 'register',
      loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
    },
    {
      path: 'products',
      loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
    },
    {
      path: 'contact',
      loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
    },
    {
      path: 'about',
      loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
    },
    {
      path: 'order',
      loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
    },
  ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    enableTracing:false,
    preloadingStrategy:PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

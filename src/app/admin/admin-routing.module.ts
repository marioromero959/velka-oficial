import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent } from './components/nav/nav.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  {
    path: '',
    component:NavComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'create',
        component:CreateComponent
      },
      {
        path:'table',
        component:TableComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

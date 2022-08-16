import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/products/services/products.service';
import { Productos } from '../../interface/product';
import { AdminService } from '../../services/admin.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {

  productos:Productos[]

  constructor(private productSvc:ProductsService,
    private adminSvc:AdminService,
    public dialog:MatDialog,
    ) { 
    this.productSvc.getAllProductsapi()
    .subscribe((productos:Productos[])=>{
    this.productos = productos
    })
  }

  ngOnInit(): void {
  }


  editarProducto(producto){
    const dialogRef = this.dialog.open(ModalComponent,{
      disableClose:false,
      data:producto
    }); 
  }
  borrarProducto(id,index){
    this.productos.splice(index,1)
    this.adminSvc.deleteProduct(id).subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )
    
  }

}

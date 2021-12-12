import { Pipe, PipeTransform } from '@angular/core';
import { product } from 'src/app/interface';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(value: product[], ...args: unknown[]):any{
    console.log('desde pipe',value)
    const show:product[] = []
    const filtrado = value.forEach(item =>{
      if(!show.includes(item)){
        show.push(item)
        item.cantidad = 1
      }else{  
        item.cantidad++
      }
      return show
    })
    return show
}
}

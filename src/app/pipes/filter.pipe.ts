import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    const resultProductos = [];
    for(const productos of value){
      if(productos.nombre.indexOf(arg) > -1){
        resultProductos.push(productos);
      };
    };
    return resultProductos;
  }

}

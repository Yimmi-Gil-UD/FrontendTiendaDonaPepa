import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCliente'
})
export class FilterClientePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultClientes = [];
    for(const cliente of value){
      if(cliente.nombre.indexOf(arg) > -1){
        resultClientes.push(cliente);
      };
    };

    return resultClientes;
  }

}

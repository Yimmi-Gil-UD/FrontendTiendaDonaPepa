import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/domain/AppConfig';
import { ProductoDTO } from 'src/app/models/producto-dto';
import { AppConfigServiceService } from 'src/app/servicios/app-config-service.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Detalle } from '../../models/detalle';
import { logging } from 'protractor';
import { InformacionProductosDTO } from 'src/app/models/informacion-productos-dto';
import { InformacionClientesDTO } from 'src/app/models/informacion-clientes-dto';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css'],
})
export class EstadisticaComponent implements OnInit {
  data: any;
  dataCliente: any;
  dataProdMas: any;
  chartOptions: any;
  chartOptionsCliente: any;
  chartOptionsProdMas: any;
  subscription: Subscription | undefined;
  config: AppConfig | undefined;


  listaProductos: ProductoDTO[];
  listaProductosVendidos: InformacionProductosDTO[];
  listaClientesMasCompran: InformacionClientesDTO[];
  labelsArreglo: ProductoDTO[] = [];

  nombres: string[] = [];
  valores: number[] = [];
  colores: any[] = [];

  constructor(
    private configService: AppConfigServiceService,
    private productoService: ProductoService,
    private clienteService:ClienteService
  ) {}

  ngOnInit(): void {
    this.consultarProductos();
    this.consultarProductosMasVendidos();
    this.consultarClientesMasCompran();
  }

  updateChartOptions() {
    this.chartOptions =
      this.config && this.config.dark
        ? this.getDarkTheme()
        : this.getLightTheme();
  }

  getLightTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
    };
  }

  getDarkTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef',
          },
        },
      },
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  generarLetra() {
    var letras = ['a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9',];
    var numero = (Math.random() * 15).toFixed(0);
    return letras[numero];
  }

  colorHEX() {
    var coolor = '';
    for (var i = 0; i < 6; i++) {
      coolor = coolor + this.generarLetra();
    }
    return '#' + coolor;
  }

  consultarProductos() {
    this.labelsArreglo = new Array();
    this.productoService.listar().subscribe((data: any) => {
        this.listaProductos = data;
        //console.log(this.listaProductos);
        
        this.graficaStockProductos();
      },
      (err) => {
        console.log(
          'Error al consultar la informacion de los productos: ' + err
        );
      }
    );
  }

  
  consultarProductosMasVendidos(){
    this.labelsArreglo = new Array();
    this.productoService.listarProductosMasVendidos().subscribe((data:any) =>{
        this.listaProductosVendidos = data;
        //console.log("Lista productos mas vendidos:" +this.listaProductosVendidos);
        this.graficaProductosMas();
    },
    err =>{
      console.log('Erro al consultar la informacion de los productos mas vendidos:  ' + err);
    })
  }

  consultarClientesMasCompran(){
    this.labelsArreglo = new Array();
    this.clienteService.listarClientesXCompras().subscribe((data:any) =>{
        this.listaClientesMasCompran = data;
        //console.log("Lista clientes que mas compran: " +this.listaClientesMasCompran);
        this.graficaClientes();
    },
    err =>{
      console.log('Erro al consultar la informacion de los productos mas vendidos:  ' + err);
    })
  }


  graficaStockProductos(){
      this.nombres = new Array;
      this.valores = new Array;
      this.listaProductos.forEach((datos) => {
      this.nombres.push(datos.nombre);
      this.valores.push(datos.stock);
      this.generarLetra();
      for (let i = 0; i < this.listaProductos.length; i++) {
        this.colores.push(this.colorHEX());
      }

      this.data = {
        labels: this.nombres,
        datasets: [
          {
            data: this.valores,
            backgroundColor: this.colores,
            hoverBackgroundColor: this.colores,
          },
        ],
      };
    });

    this.config = this.configService.config;
    this.updateChartOptions();
    this.subscription = this.configService.configUpdate$.subscribe(
      (config) => {
        this.config = config;
        this.updateChartOptions();
      }
    );
  }
  
  //Segunda Grafica

  graficaProductosMas(){
    this.nombres = new Array;
    this.valores = new Array;

    this.listaProductosVendidos.forEach((datos) => {
    this.nombres.push(datos.nombre);
    this.valores.push(datos.cantidadCompras);
    this.generarLetra();
    for (let i = 0; i < this.listaProductosVendidos.length; i++) {
      this.colores.push(this.colorHEX());
    }

    this.dataProdMas = {
      labels: this.nombres,
      datasets: [
        {
          data: this.valores,
          label: this.nombres,
          backgroundColor: this.colores,
          hoverBackgroundColor: this.colores,
          
        },
      ],
    };
  });

  this.config = this.configService.config;
  this.updateChartOptionsProdMas();
  this.subscription = this.configService.configUpdate$.subscribe(
    (config) => {
      this.config = config;
      this.updateChartOptionsProdMas();
    }
  );
}


updateChartOptionsProdMas() {
  this.chartOptionsProdMas =
    this.config && this.config.dark
      ? this.getDarkThemeProduMas()
      : this.getLightThemeProduMas();
}

getDarkThemeProduMas() {
  return {
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
    },
  };
}

getLightThemeProduMas() {
  return {
    plugins: {
      legend: {
        labels: {
          color: '#ebedef',
        },
      },
    },
  };
}

  /// Tercera Grafica

  graficaClientes(){
    this.nombres = new Array;
    this.valores = new Array;
    this.listaClientesMasCompran.forEach((datos) => {
    this.nombres.push(datos.nombreCliente);
    this.valores.push(datos.cantidadCompras);
    this.generarLetra();
    for (let i = 0; i < this.listaClientesMasCompran.length; i++) {
      this.colores.push(this.colorHEX());
    }

    this.dataCliente = {
      labels: this.nombres,
      datasets: [
        {
          data: this.valores,
          backgroundColor: this.colores,
          hoverBackgroundColor: this.colores,
        },
      ],
    };
  });

  this.config = this.configService.config;
  this.updateChartOptionsCliente();
  this.subscription = this.configService.configUpdate$.subscribe(
    (config) => {
      this.config = config;
      this.updateChartOptions();
    }
  );
}


updateChartOptionsCliente() {
  this.chartOptionsCliente =
    this.config && this.config.dark
      ? this.getDarkThemeCliente()
      : this.getLightThemeCliente();
}

getDarkThemeCliente() {
  return {
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
    },
  };
}

getLightThemeCliente() {
  return {
    plugins: {
      legend: {
        labels: {
          color: '#ebedef',
        },
      },
    },
  };
}




}

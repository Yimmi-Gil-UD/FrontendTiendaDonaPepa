import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { FacturaComponent } from './componentes/factura/factura.component';
import { EstadisticaComponent } from './componentes/estadistica/estadistica.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    ClienteComponent,
    FacturaComponent,
    EstadisticaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent} from './componentes/producto/producto.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { FacturaComponent } from './componentes/factura/factura.component';
import { EstadisticaComponent } from './componentes/estadistica/estadistica.component';

const routes: Routes = [
  { path: 'producto', component: ProductoComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'factura', component: FacturaComponent },
  { path: 'estadistica', component: EstadisticaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common'
import { UsuarioComponent } from './components/usuario/usuario.component';
import { DetalleUsuarioComponent } from './components/detalle-usuario/detalle-usuario.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { AuthGuard } from './auth.guard';
import { ListarProductosComponent } from './components/productos/listar-productos/listar-productos.component';
import { CrearProductosComponent } from './components/productos/crear-productos/crear-productos.component';
import { EditarProductosComponent } from './components/productos/editar-productos/editar-productos.component';
import { ListarServiciosComponent } from './components/listar-servicios/listar-servicios.component';
import { CrearServiciosComponent } from './components/crear-servicios/crear-servicios.component';
import { EditarServiciosComponent } from './components/editar-servicios/editar-servicios.component';
import { MenuComponent } from './components/menu/menu.component';
AuthGuard

@NgModule({
  declarations: [AppComponent, UsuarioComponent, DetalleUsuarioComponent, CrearUsuarioComponent, EditarUsuarioComponent, RegistroComponent, InicioSesionComponent, ListarProductosComponent, CrearProductosComponent, EditarProductosComponent, ListarServiciosComponent, CrearServiciosComponent, EditarServiciosComponent, MenuComponent],
  exports: [MenuComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, CommonModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

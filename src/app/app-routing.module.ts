import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { DetalleUsuarioComponent } from './components/detalle-usuario/detalle-usuario.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AuthGuard } from './auth.guard';
import { ListarProductosComponent } from './components/productos/listar-productos/listar-productos.component';
import { CrearProductosComponent } from './components/productos/crear-productos/crear-productos.component';
import { EditarProductosComponent } from './components/productos/editar-productos/editar-productos.component';
import { ListarServiciosComponent } from './components/listar-servicios/listar-servicios.component';
import { CrearServiciosComponent } from './components/crear-servicios/crear-servicios.component';
import { EditarServiciosComponent } from './components/editar-servicios/editar-servicios.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'listar-usuarios',
    component: UsuarioComponent, canActivate: [AuthGuard]
  },
  {
    path: 'detalle-usuario/:id',
    component: DetalleUsuarioComponent
  },
  {
    path: 'crear-usuario',
    component: CrearUsuarioComponent
  }
  ,
  {
    path: 'editar-usuario/:id',
    component: EditarUsuarioComponent
  }
  ,
  {
    path: 'registro',
    component: RegistroComponent
  }
  ,
  {
    path: 'inicio-sesion',
    component: InicioSesionComponent
  }
  ,
  {
    path: 'listar-productos',
    component: ListarProductosComponent
  }
  ,
  {
    path: 'crear-producto',
    component: CrearProductosComponent
  }
  ,
  {
    path: 'editar-producto/:id',
    component: EditarProductosComponent
  }
  ,
  {
    path: 'listar-servicios',
    component: ListarServiciosComponent
  }
  ,
  {
    path: 'crear-servicio',
    component: CrearServiciosComponent
  }
  ,
  {
    path: 'editar-servicio/:id',
    component: EditarServiciosComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import {FilterSearchService} from 'ng-filter-search';
import { Servicio } from 'src/app/models/servicio';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-listar-item-usuario',
  templateUrl: './listar-item-usuario.component.html',
  styleUrls: ['./listar-item-usuario.component.scss'],
})
export class ListarItemUsuarioComponent implements OnInit {

  constructor(public menuCtrl: MenuController, public productoService: ProductoService, public servicioService: ServicioService, private fs: FilterSearchService) { }

  productos: boolean;
  servicios: boolean;
  public cloner: Producto[];

  public searchMap = ['nombreProducto'];
  ngOnInit() {
    this.productos = true;
    this.servicios = false;

    this.productoService.obtenerProductos().subscribe((res) => {
    this.productoService.productos = res;
    this.cloner = [... this.productoService.productos];
  });

  this.servicioService.obtenerServicios().subscribe((res) => {
    this.servicioService.servicios = res;
  });
  
 
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  segmentChanged(event){
    console.log(event.detail.value);
    const valorSegmento = event.detail.value;
    if(valorSegmento == "Productos"){
      this.productos = true;
      this.servicios = false;
    }
    else{
      this.productos = false;
      this.servicios = true;
    }
    
  }

  loadData(event){
    console.log("Cargando información");

  }

  onSearchChange(sval: string): void {
    // Use filterSearch() function to filter the data

    // this.fs.filterSearch(sval, this.cloner, this.searchMap).subscribe((res) =>{
    //   console.log(res);
    // });

  }



}

import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-listar-item-usuario',
  templateUrl: './listar-item-usuario.component.html',
  styleUrls: ['./listar-item-usuario.component.scss'],
})
export class ListarItemUsuarioComponent implements OnInit {

  constructor(private menuCtrl: MenuController, private productoService: ProductoService, public servicioService: ServicioService) { }

  productos: boolean;
  servicios: boolean;
  ngOnInit() {
    this.productos = true;
    this.servicios = false;

    this.productoService.obtenerProductos().subscribe((res) => {
    this.productoService.productos = res;
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



}

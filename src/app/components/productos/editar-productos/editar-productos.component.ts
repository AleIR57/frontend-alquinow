import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.scss'],
})
export class EditarProductosComponent implements OnInit {
  private routeSub: Subscription;
  constructor(private productoService: ProductoService, private route: ActivatedRoute, private router: Router) { }
  producto: Producto;
  selectedId;
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      this.selectedId = params['id'];
    });
    this.productoService.obtenerProducto(this.selectedId).subscribe((res) => {

    this.productoService.productoSeleccionado = res;
  });;
  }

  editarProducto(form: NgForm){
    if(form.value.foto == undefined){
      form.value.foto = '';
    }
    console.log(form.value);
    this.productoService.editarProducto(form.value, this.selectedId).subscribe(
      res => {this.router.navigate(['/listar-productos'])
      .then(() => {
        window.location.reload();
      });  form.reset()},
      err => console.error(err)
    );
  }

}
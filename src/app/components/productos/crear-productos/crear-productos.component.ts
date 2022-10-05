import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.scss'],
})
export class CrearProductosComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private productoService: ProductoService) { }

  ngOnInit() {}

  agregarProducto(form: NgForm){
    if(form.value.foto == undefined){
      form.value.foto = '';
    }
    console.log(form.value);
    this.productoService.agregarProducto(form.value).subscribe(
      res => {this.router.navigate(['/listar-productos'])
      .then(() => {
        window.location.reload();
      });  form.reset()},
      err => console.error(err)
    );
  }

}

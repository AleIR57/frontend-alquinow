import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
  previsualizacion: String;
  constructor(private productoService: ProductoService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) { }
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

  capturarFile(event):any{
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen:any) =>{
      this.previsualizacion = imagen.base;
      
    })
 
   
  }


  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

}

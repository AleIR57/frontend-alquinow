import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.scss'],
})
export class CrearProductosComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router, public productoService: ProductoService, public sanitizer: DomSanitizer) { }
  public previsualizacion: string;
  ngOnInit() {}

  agregarProducto(form: NgForm){
    form.value.foto = this.previsualizacion;
    console.log(form.value);
    this.productoService.agregarProducto(form.value).subscribe(
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

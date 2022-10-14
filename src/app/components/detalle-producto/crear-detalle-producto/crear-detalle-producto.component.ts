import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-detalle-producto',
  templateUrl: './crear-detalle-producto.component.html',
  styleUrls: ['./crear-detalle-producto.component.scss'],
})
export class CrearDetalleProductoComponent implements OnInit {
  prev_url : any;
  public previsualizacion:any = [];
  constructor( private sanitizer : DomSanitizer, public productoService: ProductoService, public route: ActivatedRoute, public router: Router) { }
  selectedId;
  routeSub: Subscription;

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {

      this.selectedId = params['id'];
    });
    this.productoService.obtenerProducto(this.selectedId).subscribe((res) => {

      this.prev_url = res.video;
    this.productoService.productoSeleccionado = res;
  });;
  }

  editarProducto(form: NgForm){
    form.value.fotosDetalladas = this.previsualizacion;
    form.value.video = this.prev_url;
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
   
    // form.value.foto = this.previsualizacion;
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen:any) =>{
      this.previsualizacion.push(imagen.base);

      this.imageObject.push({
        image: imagen.base,
        thumbImage: imagen.base,
   
    });
    })
 
   
  }

  capturarFileVideo(event):any{
   
    // form.value.foto = this.previsualizacion;
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen:any) =>{
      this.prev_url = imagen.base;
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

    imageObject: Array<object> = [
  ];


  onSelectedFile(ev) {
    let file = ev.target.files[0];
    var URL = window.URL;
    this.prev_url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    console.log(this.prev_url)
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-crear-servicios',
  templateUrl: './crear-servicios.component.html',
  styleUrls: ['./crear-servicios.component.scss'],
})
export class CrearServiciosComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private servicioService: ServicioService, private sanitizer: DomSanitizer) { }
  public previsualizacion: string;
  ngOnInit() {}

  agregarServicio(form: NgForm){
    form.value.foto = this.previsualizacion;
    console.log(form.value);
    this.servicioService.agregarServicio(form.value).subscribe(
      res => {this.router.navigate(['/listar-servicios'])
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

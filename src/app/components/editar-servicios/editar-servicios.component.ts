import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-editar-servicios',
  templateUrl: './editar-servicios.component.html',
  styleUrls: ['./editar-servicios.component.scss'],
})
export class EditarServiciosComponent implements OnInit {
  private routeSub: Subscription;
  constructor(private servicioService: ServicioService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) { }
  servicio: Servicio;
  previsualizacion: String;
  selectedId;
  ngOnInit() {
    
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      this.selectedId = params['id'];
    });
    this.servicioService.obtenerServicio(this.selectedId).subscribe((res) => {

    this.servicioService.servicioSeleccionado = res;
  });;
  }

  editarServicio(form: NgForm){
    form.value.foto = this.previsualizacion;
 
    console.log(form.value);
    this.servicioService.editarServicio(form.value, this.selectedId).subscribe(
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

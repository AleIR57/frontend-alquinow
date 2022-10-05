import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  constructor(private servicioService: ServicioService, private route: ActivatedRoute, private router: Router) { }
  servicio: Servicio;
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
    if(form.value.foto == undefined){
      form.value.foto = '';
    }
    console.log(form.value);
    this.servicioService.editarServicio(form.value, this.selectedId).subscribe(
      res => {this.router.navigate(['/listar-servicios'])
      .then(() => {
        window.location.reload();
      });  form.reset()},
      err => console.error(err)
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-crear-servicios',
  templateUrl: './crear-servicios.component.html',
  styleUrls: ['./crear-servicios.component.scss'],
})
export class CrearServiciosComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private servicioService: ServicioService) { }

  ngOnInit() {}

  agregarServicio(form: NgForm){
    if(form.value.foto == undefined){
      form.value.foto = '';
    }
    console.log(form.value);
    this.servicioService.agregarServicio(form.value).subscribe(
      res => {this.router.navigate(['/listar-servicios'])
      .then(() => {
        window.location.reload();
      });  form.reset()},
      err => console.error(err)
    );
  }

}

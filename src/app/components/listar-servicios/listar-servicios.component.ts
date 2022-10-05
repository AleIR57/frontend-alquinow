import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-listar-servicios',
  templateUrl: './listar-servicios.component.html',
  styleUrls: ['./listar-servicios.component.scss'],
})
export class ListarServiciosComponent implements OnInit {
  private routeSub: Subscription;
  constructor(private alertController: AlertController, private servicioService: ServicioService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  selectedId;
  ngOnInit() {
    this.obtenerServicios();
  }

  obtenerServicios(){
 
    console.log("Hola");
    let variable;
    this.servicioService.obtenerServicios().subscribe((res) => {
        variable = res;
      this.servicioService.servicios = res;
    });
    
    console.log(this.servicioService.servicios);
  }

  async presentAlert(id) {
    const alert = await this.alertController.create({
      header: '¿Está seguro que desea eliminar este servicio?, recuerde, este proceso es irreversible',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            this.servicioService.eliminarServicio(id).subscribe(res =>
              {this.router.navigate(['/listar-servicios'])
              .then(() => {
                window.location.reload();
              });} , err => console.error(err)
            );
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  cerrarSesion(){
    this.authService.logout();
  }

}

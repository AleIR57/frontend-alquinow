import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss'],
})
export class DetalleUsuarioComponent implements OnInit {
  private routeSub: Subscription;
  constructor(private alertController: AlertController, private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) { }
  selectedId;
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      this.selectedId = params['id'];
    });


    
  }
  handlerMessage = '';
  roleMessage = '';
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¿Está seguro que desea eliminar este usuario?, recuerde, este proceso es irreversible',
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
            this.usuarioService.eliminarUsuario(this.selectedId).subscribe(res =>
              {this.router.navigate(['/listar-usuarios'])
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
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  editarUsuario(){
    this.router.navigate(['/editar-usuario/' + this.selectedId]);
  }

}

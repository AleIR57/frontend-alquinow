import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
})
export class InicioSesionComponent implements OnInit {

  user = {
    correo: '',
    contrasena: '',
  }

  constructor(public authService: AuthService, public router: Router, public alertController: AlertController, public usuarioService: UsuarioService) { }

  ngOnInit() {
    // (document.getElementById('boton-guardar') as HTMLButtonElement).disabled = true;

  }

  async presentAlert(error: String) {
    if(error == "Contraseña incorrecta"){
      const alert = await this.alertController.create({
        header: 'Inicio de Sesión',
        subHeader: 'Mensaje importante',
        message: 'La contraseña que acaba de digitar es incorrecta',
        buttons: ['OK'],
      });
      await alert.present();
    }
    else if(error = "El correo no existe"){
      const alert = await this.alertController.create({
        header: 'Inicio de Sesión',
        subHeader: 'Mensaje importante',
        message: 'El correo con el que desea ingresar no se encuentra registrado en la plataforma',
        buttons: ['OK'],
      });
      await alert.present();
    }
    else{
      const alert = await this.alertController.create({
        header: 'Inicio de Sesión',
        subHeader: 'Mensaje importante',
        message: 'Falló el inicio de Sesión',
        buttons: ['OK'],
      });
      await alert.present();
    }

    
  }

  signIn(){
    let rol = '';
 
    this.authService.signIn(this.user).subscribe(
      res =>{
        let id = res.id;
        localStorage.setItem('token', res.token);
        this.usuarioService.obtenerUsuario(id).subscribe((respuesta) => {
          rol = respuesta.rol;
          if(rol == "Administrador"){
            this.router.navigate(['listar-usuarios']);
          }
        });
 
       
      },
      err =>{
        this.presentAlert(err.error);
        console.error(err.error);
      }
    )
  }

}

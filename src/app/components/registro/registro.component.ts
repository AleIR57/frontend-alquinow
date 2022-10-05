import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  user = {
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    correo: '',
    contrasena: '',
  }

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) { 
  
  }

  ngOnInit() {}

  signUp(form: NgForm){

    
    console.log(form);
    this.authService.signUp(this.user).subscribe(res => {  form.reset(); this.presentAlert() },
    err => console.error(err)
  );
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Registrado correctamente!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/inicio-sesion'])
    .then(() => {
      window.location.reload();
    });
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }
  

}

import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) { 
  
  }

  ngOnInit() {}

  signUp(){
    this.authService.signUp(this.user).subscribe(res => {
      console.log(res)
      localStorage.setItem('token', res.token);
    }, err => console.log(err))
  }

}

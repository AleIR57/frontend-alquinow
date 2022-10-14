import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  

  constructor(public usuarioService: UsuarioService, public authService: AuthService, public menuCtrl: MenuController, public authGuard: AuthService) { 
   
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
   
  }

  obtenerUsuarios(){
    console.log("Hola");
    let variable;
    this.usuarioService.obtenerUsuarios().subscribe((res) => {
        variable = res;
      this.usuarioService.usuarios = res;
    });
    
    console.log(this.usuarioService.usuarios);
  }

  cerrarSesion(){
    this.authService.logout();
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

}

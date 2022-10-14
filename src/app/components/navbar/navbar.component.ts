import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import jwt_decode from "jwt-decode";
import { UsuarioService } from 'src/app/servicios/usuario.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, public menuCtrl: MenuController, public authGuard: AuthService, public usuarioService: UsuarioService) { }

  ngOnInit() {
    var decoded = jwt_decode(this.authGuard.getToken());
    this.usuarioService.obtenerUsuario(decoded['_id']).subscribe((res) => {
     
      this.usuarioService.usuario = res;
      console.log(this.usuarioService.usuario);
  });
  }

  cerrarSesion(){
    this.authService.logout();
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

}

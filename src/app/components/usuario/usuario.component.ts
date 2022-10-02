import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  

  constructor(private usuarioService: UsuarioService, private authService: AuthService) { 
   
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

}

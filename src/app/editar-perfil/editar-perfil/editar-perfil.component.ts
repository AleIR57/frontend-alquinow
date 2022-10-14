import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import jwt_decode from "jwt-decode";
import { AuthGuard } from 'src/app/auth.guard';
import { AuthService } from 'src/app/servicios/auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
})
export class EditarPerfilComponent implements OnInit {

  public routeSub: Subscription;
  constructor(public usuarioService: UsuarioService, public route: ActivatedRoute, public router: Router, public sanitizer: DomSanitizer, public authGuard: AuthService) { }
  usuario: Usuario;
  selectedId;
  public previsualizacion: string;
  archivoCapturado: string;
  ngOnInit() {
    var decoded = jwt_decode(this.authGuard.getToken());
    this.selectedId = decoded['_id'];
    this.usuarioService.obtenerUsuario(decoded['_id']).subscribe((res) => {
      this.archivoCapturado = res.foto;
     
    this.usuarioService.usuarioSeleccionado = res;
  });;

   
  }

  editarUsuario(form: NgForm){
    form.value.foto = this.previsualizacion;

    this.usuarioService.editarUsuario(form.value, this.selectedId).subscribe(
      res => {this.router.navigate(['/listar-usuarios'])
      .then(() => {
        window.location.reload();
      });  form.reset()},
      err => console.error(err)
      
    );

    
  }

  capturarFile(event):any{
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen:any) =>{
      this.previsualizacion = imagen.base;
      
    })
 
   
  }


  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  goBack(){
    this.usuarioService.usuarioSeleccionado = {
      _id: '',
      nombres: '',
      apellidos: '',
      tipoIdentificacion: '',
      identificacion: '',
      rol: '',
      celular: '',
      residencia: '',
      correo: '',
      contrasena: '',
      fechaNacimiento: '',
      estado: '',
      foto: '',
      createdAt: '',
      updatedAt: '',
    };;
    this.router.navigate(['/listar-usuarios']);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {
  public routeSub: Subscription;
  constructor(public usuarioService: UsuarioService, public route: ActivatedRoute, public router: Router, public sanitizer: DomSanitizer) { }
  usuario: Usuario;
  selectedId;
  public previsualizacion: string;
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      this.selectedId = params['id'];
    });
    this.usuarioService.obtenerUsuario(this.selectedId).subscribe((res) => {

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

  

}

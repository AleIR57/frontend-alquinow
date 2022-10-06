import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss'],
})
export class CrearUsuarioComponent implements OnInit {


  constructor(private route: ActivatedRoute, private router: Router, private usuarioService: UsuarioService, private sanitizer: DomSanitizer) { }
  public previsualizacion: string;
  public archivos: any = [];

  ngOnInit() {}

  agregarUsuario(form: NgForm){
    form.value.foto = this.previsualizacion;

  
    this.usuarioService.agregarUsuario(form.value).subscribe(
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

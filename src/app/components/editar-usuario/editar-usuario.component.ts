import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  private routeSub: Subscription;
  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) { }
  usuario: Usuario;
  selectedId;
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
    if(form.value.foto == undefined){
      form.value.foto = '';
    }
    console.log(form.value);
    this.usuarioService.editarUsuario(form.value, this.selectedId).subscribe(
      res => {this.router.navigate(['/listar-usuarios'])
      .then(() => {
        window.location.reload();
      });  form.reset()},
      err => console.error(err)
    );
  }

  

}

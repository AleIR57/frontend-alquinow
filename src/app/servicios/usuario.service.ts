import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Usuario } from '../models/usuario';
import { NgForm } from '@angular/forms';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  URL_API = 'http://localhost:4000/api/usuarios'

  usuarios : Usuario[];
  usuario : Usuario = {
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
  };
  
  usuarioSeleccionado: Usuario = {
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
  };

  constructor(private http: HttpClient) { }

  obtenerUsuarios(){
    return this.http.get<Usuario[]>(this.URL_API);
  }

  obtenerUsuario(_id){
    return this.http.get<Usuario>(`${this.URL_API}/${_id}`);
  }
  
  agregarUsuario(usuario: Usuario){
    return this.http.post(this.URL_API, usuario);
  }

  eliminarUsuario(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`);
  }


  editarUsuario(usuario: Usuario, _id: String){
    return this.http.put(`${this.URL_API}/${_id}`, usuario);
  }
 


   
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Servicio } from '../models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  URL_API = 'http://localhost:4000/api/servicios'

  servicios : Servicio[];
  servicio : Servicio;
  servicioSeleccionado: Servicio = {
    _id: '',
    nombreServicio: '',
    detalleServicio: '',
    calificacion: '',
    idUsuarioPoseedor: '',
    descripcion: '',
    precioAlquiler: '',
    tiempoAlquiler: '',
    foto: '',
    estado: '',
    idUsuarioAlquilador: '',
    createdAt: '',
    updatedAt: '',
  };

  constructor(private http: HttpClient) { }

  obtenerServicios(){
    return this.http.get<Servicio[]>(this.URL_API);
  }

  obtenerServicio(_id){
    return this.http.get<Servicio>(`${this.URL_API}/${_id}`);
  }
  
  agregarServicio(servicio: Servicio){
    return this.http.post(this.URL_API, servicio);
  }

  eliminarServicio(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`);
  }

  editarServicio(servicio: Servicio, _id: String){
    return this.http.put(`${this.URL_API}/${_id}`, servicio);
  }
 

}

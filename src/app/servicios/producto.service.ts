import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  URL_API = 'http://localhost:4000/api/productos'

  productos : Producto[];
  producto : Producto;
  productoSeleccionado: Producto = {
    _id: '',
    nombreProducto: '',
    detalleProducto: '',
    calificacion: '',
    idUsuarioPoseedor: '',
    descripcion: '',
    precioAlquiler: '',
    tiempoAlquiler: '',
    marca: '',
    modelo: '',
    foto: '',
    estado: '',
    idUsuarioAlquilador: '',
    createdAt: '',
    updatedAt: '',
  };

  constructor(private http: HttpClient) { }

  obtenerProductos(){
    return this.http.get<Producto[]>(this.URL_API);
  }

  obtenerProducto(_id){
    return this.http.get<Producto>(`${this.URL_API}/${_id}`);
  }
  
  agregarProducto(producto: Producto){
    return this.http.post(this.URL_API, producto);
  }

  eliminarProducto(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`);
  }


  editarProducto(producto: Producto, _id: String){
    return this.http.put(`${this.URL_API}/${_id}`, producto);
  }
 


}

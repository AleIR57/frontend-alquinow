import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.scss'],
})
export class ListarProductosComponent implements OnInit {
  private routeSub: Subscription;
  constructor(private alertController: AlertController, private productoService: ProductoService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }
  selectedId;
  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos(){
 
    console.log("Hola");
    let variable;
    this.productoService.obtenerProductos().subscribe((res) => {
        variable = res;
      this.productoService.productos = res;
    });
    
    console.log(this.productoService.productos);
  }

  async presentAlert(id) {
    const alert = await this.alertController.create({
      header: '¿Está seguro que desea eliminar este usuario?, recuerde, este proceso es irreversible',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            this.productoService.eliminarProducto(id).subscribe(res =>
              {this.router.navigate(['/listar-productos'])
              .then(() => {
                window.location.reload();
              });} , err => console.error(err)
            );
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  cerrarSesion(){
    this.authService.logout();
  }

}

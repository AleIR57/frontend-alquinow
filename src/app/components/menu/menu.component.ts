import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService, private menuCtrl: MenuController) { }

  ngOnInit() {}

  cerrarSesion(){
    this.authService.logout();
    this.menuCtrl.toggle();
  }

  toggleMenu(){
    console.log("Holaaaaa");
    this.menuCtrl.toggle();
  }

  

}

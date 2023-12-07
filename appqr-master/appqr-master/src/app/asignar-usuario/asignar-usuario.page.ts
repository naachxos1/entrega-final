import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignar-usuario',
  templateUrl: './asignar-usuario.page.html',
  styleUrls: ['./asignar-usuario.page.scss'],
})
export class AsignarUsuarioPage implements OnInit {
  route: Router;

  constructor(private router: Router) {}

  iniciarSesion() {
    this.router.navigate(['auth']);
  }

  iniciarSesion2() {
    this.router.navigate(['auth2']);
  }
  


  ngOnInit() {
  }

}

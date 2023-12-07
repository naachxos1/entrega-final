import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private router: Router) {}

  // Función para redirigir a la página de asignar usuario
  irAAsignarUsuario() {
    this.router.navigate(['/asignar-usuario']);
  }
}

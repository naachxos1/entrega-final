import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignarUsuarioPage } from './asignar-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: AsignarUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignarUsuarioPageRoutingModule {}

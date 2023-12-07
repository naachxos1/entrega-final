import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignarUsuarioPageRoutingModule } from './asignar-usuario-routing.module';

import { AsignarUsuarioPage } from './asignar-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignarUsuarioPageRoutingModule
  ],
  declarations: [AsignarUsuarioPage]
})
export class AsignarUsuarioPageModule {}

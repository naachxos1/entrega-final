import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaSeccionPageRoutingModule } from './lista-seccion-routing.module';

import { ListaSeccionPage } from './lista-seccion.page';

import { SharedModule } from 'src/app/app2/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaSeccionPageRoutingModule,
    SharedModule
  ],
  declarations: [ListaSeccionPage]
})
export class ListaSeccionPageModule {}

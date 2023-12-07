import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { Auth2Page } from './auth2.page';
import { Auth2PageRoutingModule } from 'src/app/app2/pages/auth2/auth2-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Auth2PageRoutingModule,
    SharedModule
  ],
  declarations: [Auth2Page]
})
export class Auth2PageModule {}

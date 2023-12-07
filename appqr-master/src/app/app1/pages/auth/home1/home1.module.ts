import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Home1PageRoutingModule } from './home1-routing.module';

import { Home1Page } from './home1.page';
import { SharedModule } from 'src/app/app1/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Home1PageRoutingModule,
    SharedModule
  ],
  declarations: [Home1Page]
})
export class Home1PageModule {}


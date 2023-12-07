import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../shared/components/header/header.component';
import { CustomInputComponent } from './../shared/components/custom-input/custom-input.component';
import { LogoComponent } from './../shared/components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudsAuComponent } from './components/cruds-au/cruds-au.component';
import { Au1Component } from './components/au1/au1.component';
import { Au2Component } from './components/au2/au2.component';
import { Au3Component } from './components/au3/au3.component';



@NgModule({
  declarations: [HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    CrudsAuComponent,
    Au1Component,
    Au2Component,
    Au3Component],
  exports: [HeaderComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    LogoComponent,
    CrudsAuComponent,
    Au1Component,
    Au2Component,
    Au3Component
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }

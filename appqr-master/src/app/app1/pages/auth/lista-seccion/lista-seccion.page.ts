
import { alumseccion } from 'src/app/app1/models/alumseccion.model';
import { Au2Component } from 'src/app/app1/shared/components/au2/au2.component';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../../models/user.model';
import { FirebaseService } from 'src/app/app1/services/firebase.service';
import { UtilsService } from 'src/app/app1/services/utils.service';

@Component({
  selector: 'app-lista-seccion',
  templateUrl: './lista-seccion.page.html',
  styleUrls: ['./lista-seccion.page.scss'],
})
export class ListaSeccionPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);
  router = inject(Router);


  alumseccion: alumseccion[] = [];
  ngOnInit() {
  }

  singOut(){
    this.firebaseSvc.singOut();
  }

    //////////////////CRUDS-AU ///////////////////////
    crudsAU1(){
      this.utilSvc.presentModal({
        component: Au2Component,
        cssClass: 'AU2'
      })
    }

    profile(){
      this.router.navigate(['profile']);
    }

    user(): User{
      return this.utilSvc.getFromLocalStorage('user');
    }



    getAlumseccion(){
      let path = `users/${this.user().uid}/listaSeccion`; //let path = `user/${this.user().uid}/secciones`;   si le cambiamos la direccion a user veremos la data de forma global
      let sub = this.firebaseSvc.getCollectionData(path).subscribe({
        next: (res: any) => {
          console.log(res);
          this.alumseccion = res;
          sub.unsubscribe();
        }
      })
    }

    ionViewWillEnter(){
      this.getAlumseccion();
    }

}

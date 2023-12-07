import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../../models/user.model';
import { FirebaseService } from 'src/app/app2/services/firebase.service';
import { UtilsService } from 'src/app/app2/services/utils.service';
import { Au1Component } from 'src/app/app2/shared/components/au1/au1.component'; 
import { Seccione} from 'src/app/app2/models/seccione.model';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);
  router = inject(Router);


  secciones: Seccione[] = [];
  ngOnInit() {
  }

  singOut(){
    this.firebaseSvc.singOut();
  }

    //////////////////CRUDS-AU ///////////////////////
    crudsAU1(){
      this.utilSvc.presentModal({
        component: Au1Component,
        cssClass: 'AU1'
      })
    }

    profile(){
      this.router.navigate(['profile']);
    }

    user(): User{
      return this.utilSvc.getFromLocalStorage('user');
    }



    getSecciones(){
      let path = `users/${this.user().uid}/secciones`; //let path = `user/${this.user().uid}/secciones`;   si le cambiamos la direccion a user veremos la data de forma global
      let sub = this.firebaseSvc.getCollectionData(path).subscribe({
        next: (res: any) => {
          console.log(res);
          this.secciones = res;
          sub.unsubscribe();
        }
      })
    }

    ionViewWillEnter(){
      this.getSecciones();
    }
}

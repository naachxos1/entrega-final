import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../../models/user.model';
import { FirebaseService } from 'src/app/app2/services/firebase.service';
import { UtilsService } from 'src/app/app2/services/utils.service';
import { CrudsAuComponent } from 'src/app/app1/shared/components/cruds-au/cruds-au.component';
import { Mensaje } from 'src/app/app2/models/mensaje.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {

  constructor() { }
  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);
  router = inject(Router);

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })


  mensajes: Mensaje[] = [];
  loading: boolean = false

  ngOnInit() {
  }

  singOut(){
    this.firebaseSvc.singOut();
  }

    //////////////////CRUDS-AU ///////////////////////
    noticias(){
      this.router.navigate(['seccion']);
    }

    user(): User{
      return this.utilSvc.getFromLocalStorage('users');
    }

    perfil(){
      this.router.navigate(['profile']);
    }

    QR(){
      this.router.navigate(['generar-qr']);
    }
        //////////////////CRUDS-AU ///////////////////////
        crudsAU(){
          this.utilSvc.presentModal({
            component: CrudsAuComponent,
            cssClass: 'crudsAU'
          })
        }
    Seccion(){
      this.router.navigate(['noticia']);
    }



    getMensajes() {
      // Ruta para obtener todos los mensajes de la carpeta 'mensajes'
      let path = `mensajes`; 
    
      this.loading = true;
    
      let sub = this.firebaseSvc.getCollectionData(path).subscribe({
        next: (res: any) => {
          console.log(res);
          this.mensajes = res;
          this.loading = false;
          sub.unsubscribe();
        }
      });
    }
    

    ionViewWillEnter(){
      this.getMensajes();
    }

    handleRefresh(event) {
      setTimeout(() => {
        this.getMensajes();
        event.target.complete();
      }, 2000);
    }


}

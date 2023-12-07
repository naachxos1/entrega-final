import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../../models/user.model';
import { FirebaseService } from 'src/app/app1/services/firebase.service';
import { UtilsService } from 'src/app/app1/services/utils.service';
import { CrudsAuComponent } from 'src/app/app1/shared/components/cruds-au/cruds-au.component';
import { Mensaje } from 'src/app/app1/models/mensaje.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home1',
  templateUrl: './home1.page.html',
  styleUrls: ['./home1.page.scss'],
})
export class Home1Page implements OnInit {

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
    crudsAU(){
      this.utilSvc.presentModal({
        component: CrudsAuComponent,
        cssClass: 'crudsAU'
      })
    }

    profile(){
      this.router.navigate(['profile']);
    }

    user(): User{
      return this.utilSvc.getFromLocalStorage('user');
    }

    Mapa(){
      this.router.navigate(['mapa']);
    }

    ListaSec(){
      this.router.navigate(['lista-seccion']);
    }

    noticias(){
      this.router.navigate(['seccion']);
    }

    QR(){
      this.router.navigate(['generar-qr']);
    }

    Scaner(){
      this.router.navigate(['escaner']);
    }



    getMensajes() {
      // Ruta para obtener todos los mensajes de la carpeta 'mensajes'
     let path = `mensajes`; // Cambiar a   let path = `users/${this.user().uid}/mensajes`;  para optener el mensaje del usuario unitario uid
    
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

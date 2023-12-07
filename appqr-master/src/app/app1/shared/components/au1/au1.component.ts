import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { User } from '../../../models/user.model';
import { UtilsService } from '../../../services/utils.service';



@Component({
  selector: 'app-au1',
  templateUrl: './au1.component.html',
  styleUrls: ['./au1.component.scss'],
})
export class Au1Component  implements OnInit {
  router: Router;

  retroceder() {
    this.router.navigate(['home1']);
  }
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  user = {} as User; //Utilizamos la interface del modelo Usuario que sera para el usuario propio 'con uid' o las interfases del modelo global 'sin uid'

  form: FormGroup<{ id: FormControl<string>; name: FormControl<string>; mensaje: FormControl<string>; }> = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    mensaje: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
  }


  async submit() {
    console.log(this.form.value);

    if (this.form.valid) {

      let path = `users/${this.user.uid}/secciones`  //      let path = `users/${this.user().uid}/mensajes`;    Asi solo lo vera el mismo usuario  si se cambia a user lo veas de forma global

      const loading = await this.utilsSvc.loading();
      await loading.present();

;

///////////Borramos el id de la imagen para que se genera una nueva al cargar//////////
delete this.form.value.id

      this.firebaseSvc.addDocument(path, this.form.value).then(async res => {

        this.utilsSvc.dismissmodal({ success: true});

        this.utilsSvc.presentToast({
          message: 'Mensaje Generado',
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

        // console.log(res);

      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(() => {
        loading.dismiss();
      })

    }
  }

}

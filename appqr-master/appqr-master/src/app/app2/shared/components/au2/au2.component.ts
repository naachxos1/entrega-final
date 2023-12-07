import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { User } from '../../../models/user.model';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-au2',
  templateUrl: './au2.component.html',
  styleUrls: ['./au2.component.scss'],
})
export class Au2Component  implements OnInit {

  router: Router;

  retroceder() {
    this.router.navigate(['home1']);
  }
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  user = {} as User; //Utilizamos la interface del modelo Usuario que sera para el usuario propio 'con uid' o las interfases del modelo global 'sin uid'


  form: FormGroup<{ id: FormControl<string>;
     name_seccion: FormControl<string>;
      name_profesor: FormControl<string>;
       name_alumnos1: FormControl<string>;
       name_alumnos2: FormControl<string>;
       name_alumnos3: FormControl<string>;
       name_alumnos4: FormControl<string>;
       name_alumnos5: FormControl<string>;}> = new FormGroup({

    id: new FormControl(''),
    name_seccion: new FormControl('', [Validators.required, Validators.minLength(8)]),
    name_profesor: new FormControl('ningun alumno', [Validators.required, Validators.minLength(8)]),
    name_alumnos1: new FormControl('ningun alumno', [Validators.required]),
    name_alumnos2: new FormControl('ningun alumno', [Validators.required]),
    name_alumnos3: new FormControl('ningun alumno', [Validators.required]),
    name_alumnos4: new FormControl('ningun alumno', [Validators.required]),
    name_alumnos5: new FormControl('ningun alumno', [Validators.required]),
  });

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
  }


  async submit() {
    console.log(this.form.value);

    if (this.form.valid) {

      let path = `users/${this.user.uid}/listaSeccion`  //      let path = `users/${this.user().uid}/mensajes`;    Asi solo lo vera el mismo usuario  si se cambia a user lo veas de forma global

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

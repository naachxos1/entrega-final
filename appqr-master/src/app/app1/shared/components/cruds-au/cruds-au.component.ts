import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { User } from '../../../models/user.model';
import { UtilsService } from '../../../services/utils.service';



@Component({
  selector: 'app-cruds-au',
  templateUrl: './cruds-au.component.html',
  styleUrls: ['./cruds-au.component.scss'],
})
export class CrudsAuComponent  implements OnInit {

  constructor(private router: Router) { }

  retroceder() {
    this.router.navigate(['home1']);
  }
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  user = {} as User; //Utilizamos la interface del modelo Usuario que sera para el usuario propio 'con uid' o las interfases del modelo global 'sin uid'

  

  form: FormGroup<{ id: FormControl<string>; name: FormControl<string>; imagen: FormControl<string>; mensaje: FormControl<string>; }> = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    imagen: new FormControl('', [Validators.required]),
    mensaje: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
  }

async takeImage(){
  const dataUrl= (await this.utilsSvc.takePicture('Imagen')).dataUrl;
  this.form.controls.imagen.setValue(dataUrl);
}

  async submit() {
    console.log(this.form.value);

    if (this.form.valid) {

      let path = `mensajes`  // Cambiar a   let path = `users/${this.user().uid}/mensajes`;  para optener el mensaje del usuario unitario uid

      const loading = await this.utilsSvc.loading();
      await loading.present();

      //////////////subir y capturar url/////////////////////
      let dataUrl = this.form.value.imagen;
      let imagePath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.imagen.setValue(dataUrl);

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

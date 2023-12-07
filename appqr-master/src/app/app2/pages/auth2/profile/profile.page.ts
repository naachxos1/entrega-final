import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { User } from '../../../models/user.model';
import { UtilsService } from '../../../services/utils.service';
import { Mensaje } from '../../../models/mensaje.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }


async takeImage(){

  let user = this.user();
  let path = `users1/${user.uid}`


  const dataUrl= (await this.utilsSvc.takePicture('imagen')).dataUrl;

  let imagePath = `${user.uid}/imagen`;
  user.imagen = await this.firebaseSvc.uploadImage(imagePath, dataUrl);


  const loading = await this.utilsSvc.loading();
  await loading.present();

  this.firebaseSvc.updateDocument(path, {imagen: user.imagen}).then(async res => {

   this.utilsSvc.saveFromLocalStorage('users1', user)

    this.utilsSvc.presentToast({
      message: 'Imagen de Perfil Generado',
      duration: 2500,
      color: 'primary',
      position: 'middle',
      icon: 'alert-circle-outline'
    })

   console.log(res);

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

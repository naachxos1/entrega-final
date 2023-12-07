import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { User } from '../../../models/user.model';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {



  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    identi: new FormControl('profesor', [Validators.required]),
  })

  ngOnInit() {
  }

  async submit() {
    console.log(this.form.value);
  
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
  
      const userCredentials = this.form.value as User;
      
      // Almacena el tipo de cuenta junto con otros datos del usuario
      userCredentials.identi = this.form.value.identi;
  
      this.firebaseSvc.singUp(userCredentials).then(async res => {
        await this.firebaseSvc.updateUser(userCredentials.name);
  
        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);
  
        this.setUserInfo(uid);
  
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
      });
    }
  }

  async setUserInfo(udi: string) {
    console.log(this.form.value);


    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${udi}`
      delete this.form.value.password;

      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {

        this.utilsSvc.saveFromLocalStorage('users', this.form.value);
        this.utilsSvc.routerLink('home2');

        this.form.reset();

        this.utilsSvc.saveInLocalStorage('users', this.form.value)

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

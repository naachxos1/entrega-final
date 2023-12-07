import { Component, OnInit, inject } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../../models/user.model';
import { UtilsService } from '../../services/utils.service';
import { and } from 'firebase/firestore';
import { identity } from 'rxjs';
@Component({
  selector: 'app-auth2',
  templateUrl: './auth2.page.html',
  styleUrls: ['./auth2.page.scss'],
})
export class Auth2Page implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  ngOnInit() {
  }


  
  async submit() {
    console.log(this.form.value);
    
    if (this.form.valid) {
    const loading = await this.utilsSvc.loading();
    await loading.present();

   
//Validacion de usuario


      this.firebaseSvc.singIn(this.form.value as User).then(res => {


        this.firebaseSvc.updateUser(this.form.value.uid);
        
        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);
        console.log(res);
        this.getUserInfo(uid);

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


  async getUserInfo(udi: string) {
    console.log(this.form.value);


    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${udi}`;

      this.firebaseSvc.getDocument(path).then((user: User) => {
        
        this.utilsSvc.saveFromLocalStorage('users', user);
        console.log(user)

        this.utilsSvc.routerLink('home2');

        this.form.reset();

        this.utilsSvc.presentToast({
          message: `Bienvenido a tu plataforma: ${user.name}`,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

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

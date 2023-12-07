import { Component, OnInit, inject } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../../models/user.model';
import { UtilsService } from '../../services/utils.service';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit() {
  }

  async submit() {
    console.log(this.form.value);
    
    if (this.form.valid) {
    const loading = await this.utilsSvc.loading();
    await loading.present();

   
      this.firebaseSvc.singIn(this.form.value as User).then(res => {


        this.firebaseSvc.updateUser(this.form.value.uid);
        
        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);
        console.log(res);
        this.getUserInfo(uid)

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

      let path = `user/${udi}`;

      this.firebaseSvc.getDocument(path).then((user: User) => {
        
        this.utilsSvc.saveFromLocalStorage('user', user);
        console.log(user)
        this.utilsSvc.routerLink('home1');

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

import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { User } from '../../../models/user.model';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),

  })

  ngOnInit() {
  }

  async submit() {
    console.log(this.form.value);
    
    if (this.form.valid) {
    const loading = await this.utilsSvc.loading();
    await loading.present();

   
      this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(res => {


        this.firebaseSvc.updateUser(this.form.value.uid);  //herramientas de firebase.serv
        

        this.utilsSvc.presentToast({
          message: "Se a enviado tu recuparedor de contraseña a tu correo!, Verifica tu Correo!!",
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'mail-circle-outline'
        })

        console.log(res);
        this.utilsSvc.routerLink('auth2');
        this.form.reset;

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

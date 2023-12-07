import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions,  } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SourceCode } from 'eslint';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController)
  toastCtrl = inject(ToastController)
  router = inject(Router);
  modalCtrl= inject(ModalController);
  saveInLocalStorage: any;




async takePicture(promptLabelHeader: string) {
  return await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
    promptLabelHeader,
    promptLabelPhoto:"Selecciona una Imagen",
    promptLabelPicture:"Toma la Foto!"
  });
};


  /////////////////Tiempo de Carga/////////////////////
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }


  ////////////////Toast Error Login/////////////////////

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  //////////////////Enrutea a pagina///////////////////////
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  //////////////////Guarda el elemento del Form ///////////////////////
  saveFromLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
  // utils-svc.ts



  //////////////////Guarda el elemento del Form ///////////////////////
  getFromLocalStorage(key: string) {
    const storedValue = localStorage.getItem(key);

    try {
      // Intenta analizar la cadena JSON
      return JSON.parse(storedValue);
    } catch (e) {
      // Si hay un error, devuelve el valor original (puede ser null o cualquier otro valor)
      return storedValue;
    }
  }

  //////////////////Modal jeje ///////////////////////
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();
  
    const{data} = await modal.onWillDismiss();
    if (data) return data;
  
  }

  dismissmodal(data?: any){
    return this.modalCtrl.dismiss(data);
  }

}
import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from './../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  storage = inject(AngularFireStorage)
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);

  ///////////////////Autenticacion Firebase /////////////////////////
  getAuth() {
    return getAuth();
  }


  ////////////////Acceso Login//////////////////////
  singIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  ////////////////Crear Usuario//////////////////////
  singUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  ////////////////Actualizar datos registro Usuario//////////////////////
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }

  ////////////////DB//////////////////////
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);

  }
///////Actualizar el documento generado//////////
  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);

  }
  //////////////////Guarda el elemento del Form ///////////////////////
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //////////////////Guarda el elemento del Form ///////////////////////
  async sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  ////////////////Cerrar Sesion//////////////////////
  singOut() {
   getAuth().signOut();
localStorage.removeItem('users');
 this.utilsSvc.routerLink('asignar-usuario');
 }


  ///////////////////////////Agregar Documento mensaje////////////////////////

  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);

  }



  ////////////////////////////Almacenar los datos Firebase/////////////////////////////////

  uploadImage(path: string, data_url: string){
    return uploadString(ref(getStorage(),path),data_url, 'data_url').then(() =>{

      return getDownloadURL(ref(getStorage(),path))
    })
  }


  ////////////////////////////Obtener data para listado/////////////////////////////////

  getCollectionData(path: string, collectionQuery?: any){
    const ref = collection(getFirestore(), path);
      return collectionData(query(ref, collectionQuery), {idField: 'id'})
  }
//A revisar
  getCollection(path: string, collectionQuery?: any){
    const ref = collection(getFirestore(), path);
  //    return collectionData(query(ref, collectionQuery), {idField: 'id'})
//  }

}

}


//Herramientas FireBase
//////////////npm install -g firebase-tools//////////////////

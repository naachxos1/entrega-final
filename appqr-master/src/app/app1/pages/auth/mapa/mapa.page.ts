import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {


  public map: mapboxgl.Map;
  public marker: mapboxgl.Marker;
  public style ='mapbox://styles/mapbox/streets-v11';

  constructor() { this.printCurrentPosition(), mapboxgl.accessToken = environment.MAPBOX_KEY}

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    if(!this.map){
      this.printCurrentPosition();
    }
  }
  
  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    console.log('posicion actual:', coordinates);
    console.log('latitud:', coordinates.coords.latitude);
    console.log('longitud:', coordinates.coords.longitude);
     this.map = new mapboxgl.Map({
      container: 'mapa-box',
      style: this.style,
      zoom: 14,
      center: [
        coordinates.coords.longitude,
        coordinates.coords.latitude
      ]
    });

    
  };


}

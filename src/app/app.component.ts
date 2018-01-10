import { Component } from '@angular/core';
import { Map } from 'leaflet';
import * as carto from 'carto.js';
import 'leaflet/dist/leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  map: Map;
  cartoClient: any;

  layerSource: string = "SELECT * FROM listings WHERE price < 150";
  layerStyle: string = `
    #layer {
      marker-width: 5;
      marker-fill-opacity: 0.7;
      marker-allow-overlap: true;
      marker-line-width: 0;
      marker-comp-op: multiply;
    }
  `;

  onMapCreated(map) {
    this.map = map;
    console.log(carto);
    this.cartoClient = new carto.Client({
      apiKey: 'YOUR_API_KEY_HERE',
      username: 'ramirocartodb'
    });
  }
}

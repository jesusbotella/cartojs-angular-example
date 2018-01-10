import { Component, OnInit, Input, Output } from '@angular/core';
import { Map, TileLayer } from 'leaflet';

@Component({
  selector: 'basemap',
  templateUrl: './basemap.component.html'
})
export class BasemapComponent implements OnInit {
  @Input() url: string;
  @Input() leafletMap: Map;

  constructor() { }

  ngOnInit() {
    if (!this.url) return;

    new TileLayer(this.url).addTo(this.leafletMap);
  }

}

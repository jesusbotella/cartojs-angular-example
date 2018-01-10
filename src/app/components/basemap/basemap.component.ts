import { Component, OnInit, Input, Output } from '@angular/core';
import { Map, TileLayer } from 'leaflet';

@Component({
  selector: 'basemap',
  template: ''
})
export class BasemapComponent implements OnInit {
  @Input() map: Map;
  @Input() url: string;

  constructor() { }

  ngOnInit() {
    if (!this.map) return;

    new TileLayer(this.url).addTo(this.map);
  }
}

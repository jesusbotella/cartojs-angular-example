import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Map} from 'leaflet';

@Component({
  selector: 'carto-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: Map;

  @Input() center;
  @Input() zoom;
  @Output() onMapCreated: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.map = new Map('map', {
      center: this.center,
      zoom: this.zoom
    });

    this.onMapCreated.emit(this.map);
  }

}

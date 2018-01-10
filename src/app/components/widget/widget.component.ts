import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Map } from 'leaflet';
import * as carto from 'carto.js';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html'
})
export class WidgetComponent implements OnInit {
  @Input() map: Map;
  @Input() client: any;
  @Input() source: any;
  @Input() column: string;
  @Input() bins: number;

  @Output() onDataChanged: EventEmitter<any> = new EventEmitter();

  data: any;

  constructor() {}

  ngOnInit() {
    let sqlSource = new carto.source.SQL(this.source);
    let histogram = new carto.dataview.Histogram(sqlSource, this.column, { bins: this.bins});

    histogram.on('dataChanged', data => {
      this.data = data;
      this.onDataChanged.emit(data);
    });

    const bboxFilter = new carto.filter.BoundingBoxLeaflet(this.map);
    histogram.addFilter(bboxFilter);

    this.client.addDataview(histogram);
  }

}

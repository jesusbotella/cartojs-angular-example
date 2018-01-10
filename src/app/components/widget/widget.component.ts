import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Map } from 'leaflet';
import * as carto from 'carto.js';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input() map: Map;
  @Input() client: any;
  @Input() source: any;
  @Input() column: string;
  @Input() bins: number;

  @Output() onDataChanged: EventEmitter<any> = new EventEmitter();

  data: any;
  binsMaxValue: number;
  barColors: Array<string> = ['#fcde9c', '#faa476', '#f0746e', '#e34f6f', '#dc3977', '#b9257a', '#7c1d6f'];

  constructor() { }

  ngOnInit() {
    const sqlSource = new carto.source.SQL(this.source);
    const histogram = new carto.dataview.Histogram(sqlSource, this.column, { bins: this.bins });

    histogram.on('dataChanged', data => {
      this.data = data;
      this.binsMaxValue = this.getMaxBinOccurrences(data.bins);
      this.onDataChanged.emit(data);
    });

    const bboxFilter = new carto.filter.BoundingBoxLeaflet(this.map);
    histogram.addFilter(bboxFilter);

    this.client.addDataview(histogram);
  }

  getBarStyle(bin) {
    if (!bin) {
      return {};
    }

    return {
      height: bin.normalized * 100 + '%',
      background: this.barColors[bin.bin]
    };
  }

  getMaxBinOccurrences(bins) {
    return bins.reduce((maxValue, currentBin) => maxValue > currentBin.freq ? maxValue : currentBin.freq, 0);
  }

}

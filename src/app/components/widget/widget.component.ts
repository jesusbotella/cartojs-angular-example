import { Component, OnInit, Input, Output } from '@angular/core';
import * as carto from 'carto.js';
import { EventEmitter } from 'selenium-webdriver';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input() client: any;
  @Input() source: any;
  @Input() column: string;
  @Input() bin: number;

  data: any;

  constructor() {}

  ngOnInit() {
    console.log('ngInit widget');
    let sqlSource = new carto.source.SQL(this.source);
    let histogram = new carto.dataview.Histogram(sqlSource, this.column);

    histogram.on('dataChanged', data => {
      this.data = data;
      console.log(data);
    });

    this.client.addDataview(histogram);
  }

}

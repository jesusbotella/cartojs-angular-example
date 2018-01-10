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

  ngOnInit() {
    debugger;
    console.log(this._getStyleBasedOnData(
      {"bins":[{"bin":0,"start":9,"end":23,"freq":1547,"min":9,"max":22,"avg":18.09437621202327,"normalized":0.5902327355971003},{"bin":1,"start":23,"end":37,"freq":2621,"min":23,"max":36,"avg":29.300267073636018,"normalized":1},{"bin":2,"start":37,"end":51,"freq":2392,"min":37,"max":50,"avg":44.737876254180605,"normalized":0.9126287676459367},{"bin":3,"start":51,"end":65,"freq":1502,"min":51,"max":64,"avg":57.84820239680426,"normalized":0.5730637161388783},{"bin":4,"start":65,"end":79,"freq":1589,"min":65,"max":78,"avg":70.19886721208307,"normalized":0.6062571537581076},{"bin":5,"start":79,"end":93,"freq":1237,"min":79,"max":92,"avg":84.50767987065481,"normalized":0.4719572682182373},{"bin":6,"start":93,"end":107,"freq":699,"min":93,"max":106,"avg":98.79828326180258,"normalized":0.2666921022510492},{"bin":7,"start":107,"end":121,"freq":459,"min":107,"max":120,"avg":115.19389978213508,"normalized":0.17512399847386495},{"bin":8,"start":121,"end":135,"freq":228,"min":121,"max":134,"avg":127.59210526315789,"normalized":0.08698969858832507},{"bin":9,"start":135,"end":149,"freq":197,"min":135,"max":149,"avg":141.12690355329948,"normalized":0.07516215185043876}],"nulls":0,"totalAmount":12471},
      ['#fcde9c', '#faa476', '#f0746e', '#e34f6f', '#dc3977', '#b9257a', '#7c1d6f']
    ));
  }

  onMapCreated(map) {
    this.map = map;
    console.log(carto);
    this.cartoClient = new carto.Client({
      apiKey: 'YOUR_API_KEY_HERE',
      username: 'ramirocartodb'
    });
  }

  _getStyleBasedOnData(data, colors) {
    const rules = data.bins.map((bin, i) => this._createRule(bin, colors[i])).join('');

    return `
      #layer {
        marker-width: 10;
        marker-fill-opacity: 0.7;
        marker-allow-overlap: false;
        marker-line-width: 0;
        marker-comp-op: multiply;
        ${rules}
      }
    `;
  }

  _createRule(bin, color) {
    return `
      [price >= ${bin.start}] {
          marker-fill: ${color};
      }
    `;
  }
}

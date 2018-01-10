import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayerComponent } from './components/layer/layer.component';
import { WidgetComponent } from './components/widget/widget.component';
import { MapComponent } from './components/map/map.component';
import { BasemapComponent } from './components/basemap/basemap.component';

@NgModule({
  declarations: [
    AppComponent,
    LayerComponent,
    WidgetComponent,
    MapComponent,
    BasemapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

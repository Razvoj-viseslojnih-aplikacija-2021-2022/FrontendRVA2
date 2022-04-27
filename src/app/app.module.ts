import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VoziloComponent } from './components/primer-components/vozilo/vozilo.component';
import { AutomobilComponent } from './components/primer-components/automobil/automobil.component';

@NgModule({
  declarations: [
    AppComponent,
    VoziloComponent,
    AutomobilComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

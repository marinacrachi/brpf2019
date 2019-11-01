import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { SorteioComponent } from './components/sorteio/sorteio.component';
import { MusicaComponent } from './components/musica/musica.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SorteioComponent,
    MusicaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; // HttpClientModule import edin
import { provideHttpClient } from '@angular/common/http'; //remplace HttpClienModule pour Angular 18
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'md'
    }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy ,  }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

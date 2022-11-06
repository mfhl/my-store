import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';//Siempre llamar este modulo
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http'



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { NotFoundComponent } from './not-found/not-found.component';





@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent

    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,//declarar la importacion del modulo siempre hacerlo
    HttpClientModule
  ],
  providers: [
    {
    provide:HTTP_INTERCEPTORS,useClass :TimeInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS,useClass :TokenInterceptor, multi:true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

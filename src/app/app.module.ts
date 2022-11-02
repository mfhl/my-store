import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';//Siempre llamar este modulo
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http'



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImgComponent } from './website/componentes/img/img.component';
import { ProductComponent } from './website/componentes/product/product.component';
import { ProductsComponent } from './website/componentes/products/products.component';
import { NavComponent } from './website/componentes/nav/nav.component';
import { ReversePipe } from './website/pipes/reverse.pipe';
import { TimeAgoPipe } from './website/pipes/time-ago.pipe';
import { HighlightDirective } from './website/directives/highlight.directive';
import { TruncatePipe } from './website/pipes/truncate.pipe';
import { SwiperModule } from 'swiper/angular';
import { SafeHtmlPipe } from './website/pipes/safe-html.pipe';

import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HomeComponent } from './website/pages/home/home.component';
import { NotFoundComponent } from './website/pages/not-found/not-found.component';
import { CategoryComponent } from './website/pages/category/category.component';
import { MycartComponent } from './website/pages/mycart/mycart.component';
import { LoginComponent } from './website/pages/login/login.component';
import { RegisterComponent } from './website/pages/register/register.component';
import { RecoveryComponent } from './website/pages/recovery/recovery.component';
import { ProfileComponent } from './website/pages/profile/profile.component';
import { ProductDetailComponent } from './website/pages/product-detail/product-detail.component';
import { LayoutComponent } from './website/componentes/layout/layout.component';



@NgModule({
  declarations: [
    AppComponent,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    NavComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    TruncatePipe,
    SafeHtmlPipe,
    HomeComponent,
    NotFoundComponent,
    CategoryComponent,
    MycartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,//declarar la importacion del modulo siempre hacerlo
    HttpClientModule,SwiperModule
  ],
  providers: [
    {
    provide:HTTP_INTERCEPTORS,useClass :TimeInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS,useClass :TokenInterceptor, multi:true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

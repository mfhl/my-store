import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';//Siempre llamar este modulo
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http'



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImgComponent } from './componentes/img/img.component';
import { ProductComponent } from './componentes/product/product.component';
import { ProductsComponent } from './componentes/products/products.component';
import { NavComponent } from './componentes/nav/nav.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { TruncatePipe } from './pipes/truncate.pipe';
import { SwiperModule } from 'swiper/angular';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CategoryComponent } from './pages/category/category.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';



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
    ProductDetailComponent
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

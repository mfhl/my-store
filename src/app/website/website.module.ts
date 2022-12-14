//imports 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//ngx quicklink
import {QuicklinkModule} from 'ngx-quicklink';

//modules
import { WebsiteRoutingModule } from './website-routing.module';
import { TruncatePipe } from './pipes/truncate.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './componentes/layout/layout.component';
import { NavComponent } from './componentes/nav/nav.component';


//shared Module
import { SharedModule } from '../shared/shared.module';






@NgModule({
  declarations: [
    NavComponent,
    TruncatePipe,
    SafeHtmlPipe,
    HomeComponent,
    MycartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SharedModule,
    QuicklinkModule
  ]
})
export class WebsiteModule { }

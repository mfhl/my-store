import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//layout
import { LayoutComponent } from './website/componentes/layout/layout.component';


//pages
import { HomeComponent } from './website/pages/home/home.component';
import { NotFoundComponent } from './website/pages/not-found/not-found.component';
import { CategoryComponent } from './website/pages/category/category.component';
import { MycartComponent } from './website/pages/mycart/mycart.component';
import { LoginComponent } from './website/pages/login/login.component';
import { RegisterComponent } from './website/pages/register/register.component';
import { RecoveryComponent } from './website/pages/recovery/recovery.component';
import { ProfileComponent } from './website/pages/profile/profile.component';
import { ProductDetailComponent } from './website/pages/product-detail/product-detail.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'category/:id',
        component: CategoryComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'mycart',
        component: MycartComponent,
      },

      {
        path: 'recovery',
        component: RecoveryComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent,
      },
    ]
  },
  //module cms
  {
    path:'cms',
    //import cms module
    loadChildren:()=>import('./cms/cms.module').then(m=>m.CmsModule)

  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

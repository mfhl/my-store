//imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes,PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
//ngx quicklink
import {QuicklinkStrategy} from 'ngx-quicklink';

//modules
import {CustomPreloadService} from './services/custom-preload.service';






const routes: Routes = [

  //module cms
  {
    path: '',
    //import cms module
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data:{
      preload:true,
    }
  },
  {
    path: 'cms',
    //import cms module
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)

  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    //preload all modules
    preloadingStrategy:QuicklinkStrategy,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

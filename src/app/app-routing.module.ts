import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';





const routes: Routes = [

  //module cms
  {
    path: '',
    //import cms module
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule)

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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//pages
import { TaskComponent } from './pages/task/task.component';
import { GridComponent } from './pages/grid/grid.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [{
  //layout principal
  path: '',
  component: LayoutComponent,
  children: [
    //here childrens
    {
      path:'',
      redirectTo:'grid',
      pathMatch:'full'
    },
    {
      path: 'grid',
      component: GridComponent
    },
    {
      path: 'task',
      component: TaskComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }

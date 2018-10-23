import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'contactmanager',
    loadChildren: './contactmanager/contactmanager.module#ContactmanagerModule'
  },
  { path: 'demo', loadChildren: './demo/demo.module#DemoModule' },
  { path: '**', redirectTo: 'contactmanager' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

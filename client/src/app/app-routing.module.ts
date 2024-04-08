import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Workflow2Component } from './components/workflow2/workflow2.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/workflow2' },
  { path: 'workflow2', pathMatch: 'full', component: Workflow2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

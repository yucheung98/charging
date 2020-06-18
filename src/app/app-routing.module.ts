import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsageComponent} from './pages/usage/usage.component';
import {ZoominComponent} from './pages/zoomin/zoomin.component';
import {Usage1Component} from './pages/usage1/usage1.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/zoomin' },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'usage', component: UsageComponent },
  { path: 'usage1', component: Usage1Component },
  { path: 'zoomin', component: ZoominComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

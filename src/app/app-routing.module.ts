import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsageComponent} from './pages/usage/usage.component';
import {ZoominComponent} from './pages/zoomin/zoomin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/zoomin' },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'usage', component: UsageComponent },
  { path: 'zoomin', component: ZoominComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

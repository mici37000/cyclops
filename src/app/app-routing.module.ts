import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { STOCKS_ROUTES } from './stocks/stocks-routes';
import { DashboardComponent } from './stocks/containers/dashboard/dashboard.component';

const routes: Route[] = [
  { path: '', component: DashboardComponent },
  ...STOCKS_ROUTES,
  {
    path: '**',
    loadComponent: () => import('./containers/page-not-found/page-not-found.component').then((mod) => mod.PageNotFoundComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {}

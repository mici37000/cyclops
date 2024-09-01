import { Route } from '@angular/router';
import { StockDetailsComponent } from './containers/stock-details/stock-details.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

export const STOCKS_ROUTES: Route[] = [
  { path: 'stock/dashboard', component: DashboardComponent },
  { path: 'stock/:symbol', component: StockDetailsComponent }
];

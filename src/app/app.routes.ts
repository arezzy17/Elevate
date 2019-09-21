import { BalanceComponent } from './balance/balance.component';
import { FaqComponent } from './faq/faq.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'faq',
    component: FaqComponent
  },
  { path: 'balance',
    component: BalanceComponent
  }
];

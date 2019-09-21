import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BalanceComponent } from './balance/balance.component';
import { FaqComponent } from './faq/faq.component';
import { RouterModule } from '@angular/router';
import {appRoutes} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    BalanceComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

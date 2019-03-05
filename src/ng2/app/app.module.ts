import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { RouterModule, UrlHandlingStrategy } from '@angular/router';

import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';
import { AppComponent } from './app.component';
import { Ng2DemoComponent } from 'ng2/app/ng2-demo.component';
import { phoneServiceProvider } from 'ng2/app/phone.service';
import {Ng7DemoComponent} from './ng7-demo.component';
import {Ng8DemoComponent} from './ng8-demo.component';

declare var angular: any;

export class CustomHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url) {
    return url.toString().startsWith('/ng') || url.toString() === '/'
  }
  extract(url) { return url; }
  merge(url, whole) { return url; }
}

angular.module('phonecatApp')
  .directive(
    'ng2Demo',
    downgradeComponent({component: Ng2DemoComponent})
  );

@NgModule({
  declarations: [
    AppComponent,
    Ng2DemoComponent,
    Ng7DemoComponent,
    Ng8DemoComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'ng2-route'
      },
      {
        path: 'ng2-route',
        component: Ng2DemoComponent
      },
      {
        path: 'ng7-route',
        component: Ng7DemoComponent
      },
      {
        path: 'ng8-route',
        component: Ng8DemoComponent
      }
    ],
    {
      useHash: true,
      enableTracing: true
    }
    )
  ],
  entryComponents: [
    Ng2DemoComponent
  ],
  providers: [
    phoneServiceProvider,
    { provide: UrlHandlingStrategy, useClass: CustomHandlingStrategy }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
/*
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['phonecatApp'], { strictDi: true });
  }
*/
}


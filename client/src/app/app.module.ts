import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { HomeComponent } from './components/home/home.component';
import { NzTableModule } from 'ng-zorro-antd/table';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, DynamicTableComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NzTableModule],
  providers: [
    provideClientHydration(),
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

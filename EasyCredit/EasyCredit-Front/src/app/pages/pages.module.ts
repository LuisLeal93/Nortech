

// importado en app.module

import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { SolicitarCreditoComponent } from './solicitar-credito/solicitar-credito.component';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Modulos compartidos
import { SharedModule } from '../shared/shared.module';

// Para que funcione ngModel
import { FormsModule } from '@angular/forms';
// Para ngFor
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        AccountSettingsComponent,
        SolicitarCreditoComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        BrowserModule,
        CommonModule
      ]
  })
  export class PagesModule { }


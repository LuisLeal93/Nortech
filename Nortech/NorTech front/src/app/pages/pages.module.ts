import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { CompetenciaComponent } from './competencia/competencia.component';
import { ProfileComponent } from './profile/profile.component';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Modulos compartidos
import { SharedModule } from '../shared/shared.module';

// Para que funcione ngModel
import { FormsModule } from '@angular/forms';
// Para ngFor
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    CompetenciaComponent,
    ProfileComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent
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

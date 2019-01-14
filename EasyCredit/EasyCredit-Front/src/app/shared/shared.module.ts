

// Archivo creado de manera manual, importado en pages.module
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';

// Para que funcione routerLink
import { RouterModule } from '@angular/router';

// Para que funcione el ngFor
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ]
  })
  export class SharedModule { }




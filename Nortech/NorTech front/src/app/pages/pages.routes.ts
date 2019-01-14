import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CompetenciaComponent } from './competencia/competencia.component';

// Guard
import { AuthGuard } from '../services/guards/auth.guard';

// Enviando la data Titulo a los breadcrumbs

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        // canActivate: [ AuthGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Profile' } },
            { path: 'competencia', component: CompetenciaComponent, data: { titulo: 'Competencia' } },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];

    // { path: 'path/:routeParam', component: MyComponent },
    // { path: 'staticPath', component: ... },
    // { path: '**', component: ... },
    // { path: 'oldPath', redirectTo: '/staticPath' },
    // { path: ..., component: ..., data: { message: 'Custom' }

    /* forchild = router_outlet dentro de un router_outlet */

    /*  Sin el Forchild, el router outlet dentro de pages no funciona,
        pero si carga los modules que estan en shared.
        app.components > pages.component | shared.component
     */
    export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);



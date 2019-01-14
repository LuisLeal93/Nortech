

import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { SolicitarCreditoComponent } from './solicitar-credito/solicitar-credito.component';

// Guard
import { AuthGuard } from '../services/guards/auth.guard';
import { TarjetaGuard } from '../services/guards/tarjeta.guard';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Configuracion' } },
            { path: 'solicitar-credito', component: SolicitarCreditoComponent,
                    canActivate: [ TarjetaGuard ], data: { titulo: 'Solicita tu EasyCredit' } },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];


    // forchild = router_outlet dentro de un router_outlet

    //  Sin el Forchild, el router outlet dentro de pages no funciona,
    //  pero si carga los modules que estan en shared.
    //    app.components > pages.component | shared.component
    //

    export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

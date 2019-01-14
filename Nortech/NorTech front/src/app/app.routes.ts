import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

// Guard
import { AuthGuard } from './services/service.index';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NopagefoundComponent }
];

/* { path: 'login', component: LoginComponent, canActivate: [ AuthGuard ] },
    { path: 'register', component: RegisterComponent, canActivate: [ AuthGuard ] }, */

    // { path: 'path/:routeParam', component: MyComponent },
    // { path: 'staticPath', component: ... },
    // { path: '**', component: ... },
    // { path: 'oldPath', redirectTo: '/staticPath' },
    // { path: ..., component: ..., data: { message: 'Custom' }

    export const APP_ROUTES = RouterModule.forRoot(appRoutes);



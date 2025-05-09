import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ClientComponent } from './components/client/client.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'client', component: ClientComponent },
    { path: 'admin', component: AdminComponent }, 

];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NinjaRegisterComponent } from './ninja-register/ninja-register.component';
import { ParentRegisterComponent } from './parent-register/parent-register.component';
import { LoginComponent } from './login/login.component';
import { PreFlightComponent } from './pre-flight/pre-flight.component';

const routes: Routes = [
  { path: '', pathMatch: "full", component: PreFlightComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register/ninja', component: NinjaRegisterComponent },
  { path: 'register/parent', component: ParentRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class CpuiRoutingModule { }

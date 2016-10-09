import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NinjaRegisterComponent } from './ninja-register/ninja-register.component';

const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: 'register/ninja' },
  { path: 'register/ninja', component: NinjaRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class CpuiRoutingModule { }
